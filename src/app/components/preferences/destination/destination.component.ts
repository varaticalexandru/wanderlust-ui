import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PopularDestination } from 'src/app/models/popular-destination.model';
import { Destination } from 'src/app/models/user-destination.model';
import { SearchDestinationService } from 'src/app/services/search/search-destination.service';
import {
  Observable,
  Subject,
  catchError,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { liveSearch } from 'src/app/utils/operators/live-search';
import { CountryMappingService } from 'src/app/services/country-mapping/country-mapping.service';
import { PopularDestinationsService } from 'src/app/services/popular-destinations/popular-destinations.service';
import { AmadeusAuthService } from 'src/app/services/amadeus-auth/amadeus-auth.service';
import { PopularDestinations } from 'src/app/models/amadeus/amadeus-popular-destinations.model';
import { AirportCityMappingService } from 'src/app/services/airport-city-mapping/airport-city-mapping.service';
import { Airports } from 'src/app/models/amadeus/amadeus-airports.model';
import { Medias } from 'src/app/models/pixabay/medias.model';
import { MediaService } from 'src/app/services/media/media.service';
import { toSentenceTitleCase, toTitleCase } from 'src/app/utils/to-title-case';
import { randomInt } from 'src/app/utils/random-int';
import { getRandomElements } from 'src/app/utils/random-arr-elements';
import { AmadeusDestinations } from 'src/app/models/amadeus/amadeus-destinations.model';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { PopularDestinationCardComponent } from './popular-destination-card/popular-destination-card.component';
import { SearchResultCardComponent } from './search-result-card/search-result-card.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import {
  MatFormField,
  MatLabel,
  MatPrefix,
} from '@angular/material/form-field';
import {
  MatCard,
  MatCardTitle,
  MatCardContent,
  MatCardFooter,
} from '@angular/material/card';
import { PreferencesService } from 'src/app/services/preferences/preferences.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatIcon,
    MatPrefix,
    NgIf,
    NgFor,
    SearchResultCardComponent,
    PopularDestinationCardComponent,
    MatCardFooter,
    MatProgressBar,
    MatButton,
    RouterOutlet,
    AsyncPipe,
    FooterComponent,
  ],
})
export class DestinationComponent implements OnInit {
  private searchTerm = new Subject<string>();
  searchTermString: string = '';
  destinations: Array<Destination> = [];
  popularDestinations$!: Observable<PopularDestination[]>;
  selectedDestination!: Destination;
  popularDestinationsNumber: number = 3;
  isLoading: boolean = true;

  readonly destinations$ = this.searchTerm.pipe(
    liveSearch((term: string) =>
      this.destinationService.searchDestinations(term)
    ),
    switchMap(
      (destinations: AmadeusDestinations): Observable<Destination[]> =>
        this.mapDestinations(destinations)
    ),
    catchError((error: any) => {
      console.error('Error fetching destinations: ', error);
      this.snackBar.open('Error fetching destinations ❌', 'Retry', {
        duration: 5000,
        politeness: 'assertive',
      }).onAction().subscribe(() => {
        this.search(this.searchTermString);
      });
      return of([]);
    })
  );

  constructor(
    private router: Router,
    private amadeusAuthService: AmadeusAuthService,
    private destinationService: SearchDestinationService,
    private countryMappingService: CountryMappingService,
    private popularDestinationsService: PopularDestinationsService,
    private airportCityMappingService: AirportCityMappingService,
    private mediaService: MediaService,
    private preferencesService: PreferencesService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.popularDestinations$ = this.getPopularDestinations();
  }

  private fetchPopularDestinations(): void {
    this.isLoading = true;
    this.popularDestinations$ = this.getPopularDestinations().pipe(
      tap(() => (this.isLoading = false))
    );
  }

  private getPopularDestinations(): Observable<PopularDestination[]> {
    return this.popularDestinationsService.popularDestinations$.pipe(
      switchMap((popularDestinations: PopularDestinations) =>
        this.fetchAirportDetails(popularDestinations)
      ),
      switchMap((destinations: Airports[]) =>
        this.fetchDestinationImages(destinations)
      ),
      catchError((error: any) => {
        console.error('Error fetching popular destinations: ', error);
        this.snackBar.open('Error fetching popular destinations ❌', 'Retry', {
          duration: 5000,
          politeness: 'assertive',
        }).onAction().subscribe(() => {
          this.fetchPopularDestinations();
        });
        return of([]);
      }),
      tap(() => (this.isLoading = false))
    );
  }

  private fetchAirportDetails(
    popularDestinations: PopularDestinations
  ): Observable<Airports[]> {
    const randomPopularDestinations = getRandomElements(
      popularDestinations.data,
      this.popularDestinationsNumber
    );
    const destinationNames$ = randomPopularDestinations.map(
      (destination: any) =>
        this.airportCityMappingService.getAirportDetailsByCode(
          destination.destination
        )
    );
    return forkJoin(destinationNames$);
  }

  private fetchDestinationImages(
    destinations: Airports[]
  ): Observable<PopularDestination[]> {
    const destinationsImages$ = destinations.map((destination: Airports) =>
      this.mediaService
        .fetchMediaByQuery(destination.data[0].address.cityName)
        .pipe(
          map((medias: Medias) =>
            this.createPopularDestination(destination, medias)
          )
        )
    );
    return forkJoin(destinationsImages$);
  }

  private createPopularDestination(
    destination: Airports,
    medias: Medias
  ): PopularDestination {
    const randomIndex = randomInt(medias.hits.length);
    return {
      cityName: toSentenceTitleCase(destination.data[0].address.cityName),
      countryName: toSentenceTitleCase(destination.data[0].address.countryName),
      image: medias.hits[randomIndex].webformatURL,
    };
  }

  private mapDestinations(
    destinations: AmadeusDestinations
  ): Observable<Destination[]> {
    return destinations.data
      ? of(
          destinations.data.map((destination) => ({
            cityName: destination.name,
            countryName: this.getCountryName(destination.address.countryCode),
          }))
        )
      : of([]);
  }

  search(searchTerm: string) {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    if (normalizedTerm !== '' && normalizedTerm.length >= 3) {
      this.searchTerm.next(normalizedTerm);
    }
  }

  getCountryName(code: string): string {
    return this.countryMappingService.getCountryNameByCode(code);
  }

  handleDestinationSelect(destination: any) {
    this.selectedDestination = {
      cityName: destination.cityName,
      countryName: destination.countryName,
    };
  }

  isEqual(dest1: any, dest2: any): boolean {
    return (
      dest1.countryName === dest2.countryName &&
      dest1.cityName === dest2.cityName
    );
  }

  back() {
    // Implement back navigation logic if needed
  }

  next() {
    this.preferencesService.setPreference(
      'destination',
      this.selectedDestination
    );
    this.router.navigate(['/preferences/period']);
  }
}
