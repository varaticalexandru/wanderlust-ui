import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
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
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
import { SummaryComponent } from './summary/summary.component';
import { AsyncPipe } from '@angular/common';
import { DailyComponent } from './daily/daily.component';
import { TextSearchService } from 'src/app/services/google-maps/text-search/text-search.service';
import {
  Place,
  PlaceDetailsResponse,
} from 'src/app/models/google-maps/places-details.model';
import '@googlemaps/extended-component-library/api_loader.js';
import { environment } from 'src/environments/environment';
import '@googlemaps/extended-component-library/place_overview.js';
import '@googlemaps/extended-component-library/place_building_blocks/place_directions_button.js';
import { svg_string } from 'src/app/data/location-pin.data';
import { SvgService } from 'src/app/services/svg/svg.service';
import { ThemePalette } from '@angular/material/core';
import { DayColorSvgCompositeMap } from 'src/app/models/svg.model';
import { daysNumberInRange } from 'src/app/utils/distance-in-days';

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
    private svgService: SvgService
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
            this.convertToLatLngLiteral(recommendation.location)
          );
        })
      );

      if (this.map) this.map.fitBounds(this.getBounds(this.markers));
    });
  }

  loadPreferences(): Preferences {
    return this.preferencesService.getPreferences();
  }

  loadItineraryWithDetails(): Observable<Itinerary> {
    return this.itineraryService
      .fetchItineraryByPreferences(this.preferences)
      .pipe(
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

              itinerary.schedule.forEach((dailyPlan: DailyPlan, i: number) => {
                dailyPlan.recommendations.forEach(
                  (recommendation: Recommendation) => {}
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

  getBounds(
    markers: Array<google.maps.LatLngLiteral>
  ): google.maps.LatLngBoundsLiteral {
    if (markers.length === 0) {
      // throw new Error("Cannot calculate bounds of an empty array");
      return { north: 0, south: 0, east: 0, west: 0 };
    }

    let north = markers[0].lat;
    let south = markers[0].lat;
    let east = markers[0].lng;
    let west = markers[0].lng;

    for (const marker of markers) {
      north = north = Math.max(north, marker.lat);
      south = south = Math.min(south, marker.lat);
      east = east = Math.max(east, marker.lng);
      west = west = Math.min(west, marker.lng);
    }

    const bounds = {
      north: north,
      south: south,
      east: east,
      west: west,
    };

    return bounds;
  }

  convertToLatLngLiteral(location: Location): google.maps.LatLngLiteral {
    return {
      lat: location.latitude,
      lng: location.longitude,
    };
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

    const markerPosition = this.convertToLatLngLiteral(recommendation.location);
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
}
