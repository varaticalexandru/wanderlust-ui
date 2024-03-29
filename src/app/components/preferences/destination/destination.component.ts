import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopularDestination } from 'src/app/models/popular-destination';
import { Destination } from 'src/app/models/user-destination';
import { SearchDestinationService } from 'src/app/services/search/search-destination.service';
import { Observable, Subject, forkJoin, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { liveSearch } from 'src/app/utils/operators/live-search';
import { CountryMappingService } from 'src/app/services/country-mapping/country-mapping.service';
import { PopularDestinationsService } from 'src/app/services/popular-destinations/popular-destinations.service';
import { AmadeusAuthService } from 'src/app/services/amadeus-auth/amadeus-auth.service';
import { PopularDestinations } from 'src/app/models/amadeus/amadeus-popular-destinations';
import { AirportCityMappingService } from 'src/app/services/airport-city-mapping/airport-city-mapping.service';
import { Airports } from 'src/app/models/amadeus/amadeus-airports';
import { Medias } from 'src/app/models/pixabay/medias';
import { MediaService } from 'src/app/services/media/media.service';
import { toSentenceTitleCase, toTitleCase } from 'src/app/utils/to-title-case';
import { randomInt } from 'src/app/utils/random-int';
import { getRandomElements } from 'src/app/utils/random-arr-elements'
import { AmadeusDestinations } from 'src/app/models/amadeus/amadeus-destinations';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {

  private searchTerm = new Subject<string>();
  searchTermString: string = '';
  destinations: Array<Destination> = [];
  popularDestinations$!: Observable<PopularDestination[]>;
  selectedDestination!: Destination;
  popularDestinationsNumber: number = 3;
  isLoading: boolean;

  readonly destinations$ = this.searchTerm.pipe(
    liveSearch((term: string) => this.destinationService.searchDestinations(term)),
    switchMap((destinations: AmadeusDestinations): Observable<Destination[]> => {
      
      return destinations.data ?
      of(destinations.data.map(destination => {
        return {
          cityName: destination.name,
          countryName: this.getCountryName(destination.address.countryCode)
        };

      })) : of([]);
    
    })
  );

  
  constructor(
    private router: Router,
    private amadeusAuthService: AmadeusAuthService,
    private destinationService: SearchDestinationService,
    private countryMappingService: CountryMappingService,
    private popularDestinationsService: PopularDestinationsService,
    private airportCityMappingService: AirportCityMappingService,
    private mediaService: MediaService
  ) {

    this.isLoading = true;
  }

  ngOnInit(): void {

    this.popularDestinations$ = this.popularDestinationsService.popularDestinations$.pipe(

      mergeMap((popularDestinations: PopularDestinations): Observable<Airports[]> => {
        const randomPopularDestinations = getRandomElements(popularDestinations.data, this.popularDestinationsNumber);
        const destinationNames$: Observable<Airports>[] = randomPopularDestinations.map(
          (destination: any) =>
            this.airportCityMappingService.getAirportDetailsByCode(destination.destination)
        );

        return forkJoin(destinationNames$);
      }),
      mergeMap((destinations: Airports[]): Observable<PopularDestination[]> => {

        const destinationsImages$: Observable<PopularDestination>[] = destinations.map((destination: Airports) => {
          return this.mediaService.fetchMediaByQuery(destination.data[0].address.cityName).pipe(
            map((medias: Medias): PopularDestination => {
              const randomIndex = randomInt(medias.hits.length);
              return {
                cityName: toSentenceTitleCase(destination.data[0].address.cityName),
                countryName: toSentenceTitleCase(destination.data[0].address.countryName),
                image: medias.hits[randomIndex].webformatURL
              }
            })
          )
        });

        return forkJoin(destinationsImages$);
      }),
      tap((popularDestinations: PopularDestination[]) => this.isLoading = false)
      );

  }


  search(searchTerm: string) {
    let normalizedTerm = searchTerm.trim().toLowerCase();

    normalizedTerm !== '' && normalizedTerm.length >= 3 ? this.searchTerm.next(normalizedTerm) : null;
  }

  getCountryName(code: string): string {
    return this.countryMappingService.getCountryNameByCode(code);
  }

  handleDestinationSelect(destination: any) {
    this.selectedDestination = {
      cityName: destination.cityName,
      countryName: destination.countryName
    };
  }

  isEqual(dest1: any, dest2: any): boolean {
    return dest1.countryName == dest2.countryName &&
           dest1.cityName == dest2.cityName;
  }

  next() {
    this.router.navigate(['/preferences/period']);
  }
}
