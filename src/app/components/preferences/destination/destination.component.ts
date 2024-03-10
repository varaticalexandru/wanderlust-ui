import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopularDestination } from 'src/app/models/popular-destination';
import { Destination } from 'src/app/models/user-destination';
import { SearchDestinationService } from 'src/app/services/search/search-destination.service';
import { Observable, Subject, debounce, debounceTime, distinctUntilChanged, forkJoin, mergeMap, switchMap } from 'rxjs';
import { liveSearch } from 'src/app/utils/operators/live-search';
import { CountryMappingService } from 'src/app/services/country-mapping/country-mapping.service';
import { PopularDestinationsService } from 'src/app/services/popular-destinations/popular-destinations.service';
import { AmadeusAuthService } from 'src/app/services/amadeus-auth/amadeus-auth.service';
import { PopularDestinations } from 'src/app/models/amadeus/amadeus-popular-destinations';
import { AirportCityMappingService } from 'src/app/services/airport-city-mapping/airport-city-mapping.service';
import { Airports } from 'src/app/models/amadeus/amadeus-airports';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {

  private searchTerm = new Subject<string>();
  searchTermString: string = '';
  destinations: Array<Destination> = [];
  popularDestinations!: PopularDestinations;

  readonly destinations$ = this.searchTerm.pipe(
    liveSearch((term: string) => this.destinationService.searchDestinations(term))
  );

  countryMapping$ = this.countryMappingService;

  constructor(
    private router: Router,
    private amadeusAuthService: AmadeusAuthService,
    private destinationService: SearchDestinationService,
    private countryMappingService: CountryMappingService,
    private popularDestinationsService: PopularDestinationsService,
    private airportCityMappingService: AirportCityMappingService
  ) {

  }

  ngOnInit(): void {


    this.popularDestinationsService.popularDestinations$.pipe(
      mergeMap((popularDestinations: PopularDestinations) => {

        const destinationNames$: Observable<Airports>[] = popularDestinations.data.map((destination:any) =>
          this.airportCityMappingService.getAirportDetailsByCode(destination.destination)
        );

        return forkJoin(destinationNames$);
      })
    ).subscribe({
      next: (destinations: Airports[]) => {
        console.log(destinations);
      }
    })
  }


  search(searchTerm: string) {
    let normalizedTerm = searchTerm.trim().toLowerCase();

    normalizedTerm !== '' && normalizedTerm.length >= 3 ? this.searchTerm.next(normalizedTerm) : null;
  }

  getCountryName(code: string): string {
    return this.countryMappingService.getCountryNameByCode(code);
  }

}
