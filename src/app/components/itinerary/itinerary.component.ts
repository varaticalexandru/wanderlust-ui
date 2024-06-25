import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import {
  GoogleMap,
  GoogleMapsModule,
  MapAdvancedMarker,
  MapInfoWindow,
} from '@angular/google-maps';
import { ItineraryService } from 'src/app/services/itinerary/itinerary.service';
import { PreferencesService } from 'src/app/services/preferences/preferences.service';
import { Preferences } from 'src/app/models/preferences.model';
import {
  DailyPlan,
  Itinerary,
  Location,
  Recommendation,
} from 'src/app/models/itinerary.model';
import {
  Observable,
  ObservableInput,
  catchError,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { SummaryComponent } from './summary/summary.component';
import { AsyncPipe } from '@angular/common';
import { DailyComponent } from './daily/daily.component';
import { TextSearchService } from 'src/app/services/google-maps/text-search/text-search.service';
import { PlaceDetailsResponse } from 'src/app/models/google-maps/places-details.model';
import '@googlemaps/extended-component-library/api_loader.js';
import { environment } from 'src/environments/environment';
import '@googlemaps/extended-component-library/place_overview.js';
import '@googlemaps/extended-component-library/place_building_blocks/place_directions_button.js';
import { SvgService } from 'src/app/services/svg/svg.service';
import { DayColorSvgCompositeMap } from 'src/app/models/svg.model';
import { daysNumberInRange } from 'src/app/utils/distance-in-days';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SaveItineraryDialogComponent } from './save-itinerary-dialog/save-itinerary-dialog.component';
import { Router } from '@angular/router';
import { convertToLatLngLiteral, getBounds } from 'src/app/utils/maps-utils';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
  ProgressSpinnerMode,
} from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [
    MatCardModule,
    MatStepperModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    GoogleMapsModule,
    SummaryComponent,
    DailyComponent,
    AsyncPipe,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ItineraryComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  parser = new DOMParser();

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value: number = 25;
  diameter: number = 100;
  strokeWidth: number = 20;
  
  isLoading: boolean = false;
  loadingStatus: string = 'Setting up itinerary generation... 🚀';

  _convertToLatLngLiteral = convertToLatLngLiteral;

  currentUsedId: string | null = null;
  api_key = environment.googleMaps.api_key;
  page_size: number = 1;
  preferences!: Preferences;
  _itinerary!: Itinerary;
  itinerary$!: Observable<Itinerary | null>;
  dayColorSvgStringMap!: DayColorSvgCompositeMap;

  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  options: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    gestureHandling: 'greedy',
  };
  width: number | null = null;
  height: number | null = null;
  zoom: number = 13;
  markers: Array<google.maps.LatLngLiteral> = [];

  constructor(
    private preferencesService: PreferencesService,
    private itineraryService: ItineraryService,
    private textSearchService: TextSearchService,
    private svgService: SvgService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.currentUsedId = localStorage.getItem('userId');
    this.preferences = this.loadPreferences();
    this.initializeDayColorSvgStringMap();
    this.itinerary$ = this.loadItineraryWithDetails();
  }

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {
    this.subscribeToItinerary();
  }

  private loadPreferences(): Preferences {
    return this.preferencesService.getPreferences();
  }

  private initializeDayColorSvgStringMap(): void {
    this.dayColorSvgStringMap =
      this.svgService.getRandomDayColorSvgStringCompositeMap(
        daysNumberInRange(
          new Date(this.preferences.period.startDate),
          new Date(this.preferences.period.endDate)
        )
      );
  }

  private loadItineraryWithDetails(): Observable<Itinerary> {
    return this.itineraryService
      .generateItineraryByPreferences(this.preferences)
      .pipe(
        tap(() => {
          this.value = 40;
          this.loadingStatus = 'Generating travel itinerary with AI... 🤖';
        }),
        switchMap((itinerary: Itinerary) =>
          this.addPlaceIdToItinerary(itinerary)
        ),
        mergeMap((itinerary: Itinerary) =>
          this.addPlaceDetailsToItinerary(itinerary)
        ),
        catchError((error: any, caught: Observable<Itinerary>) => {
          this.isLoading = false;
          return caught;
        })
      );
  }

  private addPlaceIdToItinerary(itinerary: Itinerary): Observable<Itinerary> {
    return this.loadDestinationPlaceId(
      itinerary.cityName,
      itinerary.countryName
    ).pipe(
      map((placeDetails: PlaceDetailsResponse) => {
        itinerary.placeId = placeDetails.places[0].id;
        this.value = 60;
        this.loadingStatus = 'Fetching destination details...';

        return itinerary;
      })
    );
  }

  private loadDestinationPlaceId(
    cityName: string,
    countryName: string
  ): Observable<PlaceDetailsResponse> {
    const placeDetailsReq = {
      textQuery: `${cityName}, ${countryName}`,
      pageSize: this.page_size,
    };
    return this.textSearchService.fetchPlaceDetailsByQuery(placeDetailsReq);
  }

  private addPlaceDetailsToItinerary(
    itinerary: Itinerary
  ): Observable<Itinerary> {
    const detailsRequests$ = this.getPlaceDetailsRequests(itinerary);
    return forkJoin(detailsRequests$).pipe(
      map((placeDetails: PlaceDetailsResponse[]) => {
        this.value = 80;
        this.loadingStatus = 'Fetching recommendations details... 🧐';

        return this.mapPlaceDetailsToItinerary(itinerary, placeDetails);
      })
    );
  }

  private getPlaceDetailsRequests(
    itinerary: Itinerary
  ): Observable<PlaceDetailsResponse>[] {
    return itinerary.schedule.flatMap((dailyPlan) =>
      dailyPlan.recommendations.map((place) =>
        this.textSearchService.fetchPlaceDetailsByQuery({
          textQuery: `${place.name}, ${itinerary.cityName}, ${itinerary.countryName}`,
          pageSize: this.page_size,
        })
      )
    );
  }

  private mapPlaceDetailsToItinerary(
    itinerary: Itinerary,
    placeDetails: PlaceDetailsResponse[]
  ): Itinerary {

    this.value = 85;
    this.loadingStatus = 'Adding recommendations details to itinerary ... 📝';

    this.center = { lat: itinerary.latitude, lng: itinerary.longitude };

    let idx = 0;
    itinerary.schedule.forEach((dailyPlan: DailyPlan, i: number) => {
      dailyPlan.color = this.getColor(i);
      dailyPlan.recommendations.forEach((recommendation: Recommendation) => {
        this.updateRecommendationWithDetails(
          recommendation,
          placeDetails[idx],
          i
        );
        idx++;
      });
    });

    this._itinerary = itinerary;

    return itinerary;
  }

  private updateRecommendationWithDetails(
    recommendation: Recommendation,
    placeDetail: PlaceDetailsResponse,
    day: number
  ): void {
    recommendation.name = placeDetail.places[0].displayName.text;
    recommendation.id = placeDetail.places[0].id;
    recommendation.location = placeDetail.places[0].location;
    recommendation.content = this.getSvg(day);
  }

  private subscribeToItinerary(): void {
    this.itinerary$.subscribe((itinerary: Itinerary | null) => {
      if (itinerary) {
        this.addMarkersToMap(itinerary);
        this.fitMapToBounds();
      }
    });
  }

  private addMarkersToMap(itinerary: Itinerary): void {

    this.value = 95;
    this.loadingStatus = 'Adding recommendations markers to map ... 📍';


    itinerary.schedule.forEach((dailyPlan) =>
      dailyPlan.recommendations.forEach((recommendation) => {
        this.markers.push(convertToLatLngLiteral(recommendation.location));
      })
    );
  }

  private fitMapToBounds(): void {
    if (this.map) {
      this.map.fitBounds(getBounds(this.markers));
    }

    this.value = 100;
    this.loadingStatus = 'Itinerary generated successfully! 🎉';
    this.isLoading = false;
  }

  openInfoWindow(
    marker: MapAdvancedMarker,
    recommendation: Recommendation
  ): void {
    const containerDiv = document.createElement('div');
    containerDiv.setAttribute('class', 'container');

    const placeOverview = document.createElement('gmpx-place-overview');
    placeOverview.setAttribute('place', recommendation.id);
    placeOverview.setAttribute('size', 'medium');

    const directionsButton = document.createElement(
      'gmpx-place-directions-button'
    );
    directionsButton.setAttribute('slot', 'action');
    directionsButton.textContent = 'Directions';

    placeOverview.appendChild(directionsButton);
    containerDiv.appendChild(placeOverview);

    this.infoWindow.openAdvancedMarkerElement(
      marker.advancedMarker,
      placeOverview
    );
  }

  focusOnMarker(recommendation: Recommendation): void {
    const markerPosition = convertToLatLngLiteral(recommendation.location);
    this.map.panTo(markerPosition);
    this.zoom = 16;
  }

  getSvg(day: number): HTMLElement {
    return this.parser.parseFromString(
      this.dayColorSvgStringMap.daySvgStringMap[day],
      'image/svg+xml'
    ).documentElement;
  }

  getColor(day: number): string {
    return this.dayColorSvgStringMap.dayColorMap[day];
  }

  saveItinerary(): void {
    const dialogRef = this.dialog.open(SaveItineraryDialogComponent, {
      maxWidth: '1200px',
      maxHeight: '800px',
      width: '800px',
      height: '250px',
      data: { itinerary: this._itinerary },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result.trim() !== '') {
        this._itinerary.name = result;
        this.saveItineraryToService();
      }
    });
  }

  private saveItineraryToService(): void {
    this.itineraryService
      .createItineraryByUserId(this.currentUsedId as string, this._itinerary)
      .subscribe((itinerary: Itinerary) => {
        this.snackBar.open('Itinerary saved successfully ✅', 'Close', {
          duration: 5000,
          politeness: 'assertive',
        });
        this.router.navigate(['/itineraries']);
      });
  }
}
