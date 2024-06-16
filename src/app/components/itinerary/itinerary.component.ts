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
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
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

  api_key = environment.googleMaps.api_key;
  page_size: number = 1;
  preferences!: Preferences;
  _itinerary!: Itinerary;
  itinerary$!: Observable<Itinerary | null>;
  _placeDetails: Array<Recommendation> = [];
  dayColorSvgStringMap!: DayColorSvgCompositeMap;

  _convertToLatLngLiteral = convertToLatLngLiteral;

  center!: google.maps.LatLngLiteral;

  options: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    gestureHandling: 'greedy',
  };

  width: number | null = null;
  height: number | null = null;
  zoom: number = 13;

  markers!: Array<google.maps.LatLngLiteral>;

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
    this.preferences = this.loadPreferences();

    this.center = { lat: 0, lng: 0 };
    this.markers = [];
    this.dayColorSvgStringMap =
      this.svgService.getRandomDayColorSvgStringCompositeMap(
        daysNumberInRange(
          new Date(this.preferences.period.startDate),
          new Date(this.preferences.period.endDate)
        )
      );

    console.log(this.dayColorSvgStringMap);

    this.itinerary$ = this.loadItineraryWithDetails();
  }

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {
    this.itinerary$.subscribe((itinerary: Itinerary | null) => {
      itinerary?.schedule?.forEach((dailyPlan) =>
        dailyPlan?.recommendations.forEach((recommendation) => {
          this.markers.push(
            convertToLatLngLiteral(recommendation.location)
          );
        })
      );

      if (this.map) this.map.fitBounds(getBounds(this.markers));
    });
  }

  loadPreferences(): Preferences {
    return this.preferencesService.getPreferences();
  }

  loadDestinationPlaceId(
    cityName: string,
    countryName: string
  ): Observable<PlaceDetailsResponse> {
    const placeDetailsReq = {
      textQuery: `${cityName}, ${countryName}`,
      pageSize: this.page_size,
    };

    return this.textSearchService.fetchPlaceDetailsByQuery(placeDetailsReq);
  }

  loadItineraryWithDetails(): Observable<Itinerary> {
    return this.itineraryService
      .generateItineraryByPreferences(this.preferences)
      .pipe(
        switchMap((itinerary: Itinerary): Observable<Itinerary> => {
          return this.loadDestinationPlaceId(
            itinerary.cityName,
            itinerary.countryName
          ).pipe(
            map((placeDetails: PlaceDetailsResponse) => {
              itinerary.placeId = placeDetails.places[0].id;
              console.log(itinerary);
              return itinerary;
            })
          );
        }),
        mergeMap((itinerary: Itinerary): Observable<Itinerary> => {
          const detailsRequests$: Observable<PlaceDetailsResponse>[] =
            itinerary.schedule.flatMap((dailyPlan) =>
              dailyPlan.recommendations.map((place) =>
                this.textSearchService.fetchPlaceDetailsByQuery({
                  textQuery: `${place.name}, ${itinerary.cityName}, ${itinerary.countryName}`,
                  pageSize: this.page_size,
                })
              )
            );

          return forkJoin(detailsRequests$).pipe(
            map((placeDetails: PlaceDetailsResponse[]): Itinerary => {
              this.center = {
                lat: itinerary.latitude,
                lng: itinerary.longitude,
              };

              let idx = 0;
              itinerary.schedule.forEach((dailyPlan: DailyPlan, i: number) => {
                dailyPlan.color = this.getColor(i);

                dailyPlan.recommendations.forEach(
                  (recommendation: Recommendation) => {
                    this._placeDetails.push(recommendation);

                    recommendation.name =
                      placeDetails[idx].places[0].displayName.text;
                    recommendation.id = placeDetails[idx].places[0].id;
                    recommendation.location =
                      placeDetails[idx].places[0].location;

                    idx++;

                    recommendation.content = this.getSvg(i);
                  }
                );
              });

              this._itinerary = itinerary;
              console.log(itinerary);
              return itinerary;
            })
          );
        })
      );
  }

  


  openInfoWindow(marker: MapAdvancedMarker, recommendation: Recommendation) {
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
    console.log('FOCUSED');

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
    return this.dayColorSvgStringMap.dayColorMap[day] as string;
  }

  saveItinerary() {
    const dialogRef = this.dialog.open(SaveItineraryDialogComponent, {
      maxWidth: '1200px',
      maxHeight: '800px',
      width: '800px',
      height: '250px',
      data: {
        itinerary: this._itinerary,
      },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result.trim() !== '') {
        this._itinerary.name = result;
        this.itineraryService
          .createItinerary(this._itinerary)
          .subscribe((itinerary: Itinerary) => {
            console.log(itinerary);
            this.snackBar.open('Itinerary saved successfully ✅', 'Close', {
              duration: 5000,
              politeness: 'assertive',
            });

            this.router.navigate(['/itineraries']);
          });
      }
    });
  }
}
