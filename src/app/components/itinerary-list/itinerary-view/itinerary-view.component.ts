import '@googlemaps/extended-component-library/place_overview.js';
import '@googlemaps/extended-component-library/place_building_blocks/place_directions_button.js';
import '@googlemaps/extended-component-library/api_loader.js';
import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  GoogleMap,
  GoogleMapsModule,
  MapAdvancedMarker,
  MapInfoWindow,
} from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ItineraryService } from 'src/app/services/itinerary/itinerary.service';
import { DailyComponent } from '../../itinerary/daily/daily.component';
import { SummaryComponent } from '../../itinerary/summary/summary.component';
import { Itinerary, Recommendation } from 'src/app/models/itinerary.model';
import { Observable, ReplaySubject, pipe, shareReplay, tap } from 'rxjs';
import { DayColorSvgCompositeMap } from 'src/app/models/svg.model';
import { SvgService } from 'src/app/services/svg/svg.service';
import { daysNumberInRange } from 'src/app/utils/distance-in-days';
import { convertToLatLngLiteral } from 'src/app/utils/maps-utils';
import { getBounds } from 'src/app/utils/maps-utils';
import { FooterComponent } from '../../footer/footer.component';
import {
  MatProgressSpinnerModule,
  ProgressSpinnerMode,
} from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-itinerary-view',
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
    RouterOutlet,
    GoogleMapsModule,
    FooterComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './itinerary-view.component.html',
  styleUrl: './itinerary-view.component.scss',
})
export class ItineraryViewComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  isLoading: boolean = true;
  itineraryId!: string;

  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  itinerary!: Itinerary;
  dayColorSvgStringMap!: DayColorSvgCompositeMap;
  parser = new DOMParser();

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value: number = 0;
  diameter: number = 150;
  strokeWidth: number = 20;

  private itinerarySubject = new ReplaySubject<Itinerary>(1);
  itinerary$ = this.itinerarySubject
    .asObservable()
    .pipe(
      tap((itinerary) => this.setupItinerary(itinerary)),
      tap(() => (this.isLoading = false))
    );

  center!: google.maps.LatLngLiteral;

  options: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    gestureHandling: 'greedy',
  };

  width: number | null = null;
  height: number | null = 600;
  zoom: number = 13;

  markers!: Array<google.maps.LatLngLiteral>;

  _convertToLatLngLiteral = convertToLatLngLiteral;

  constructor(
    private router: Router,
    private itineraryService: ItineraryService,
    private svgSerivce: SvgService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.itineraryId = params['id'];
      this.loadItinerary();
    });
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.center = { lat: 0, lng: 0 };
    this.markers = [];

    this.value = 25;
  }

  ngAfterViewInit(): void {}

  private loadItinerary(): void {
    this.itineraryService
      .getItineraryById(this.itineraryId)
      .subscribe((itinerary) => {
        this.itinerarySubject.next(itinerary);
        this.value = 50;
      });
  }

  private setupItinerary(itinerary: Itinerary): void {

    this.value = 75;

    if (itinerary) {
      this.center = {
        lat: itinerary.latitude,
        lng: itinerary.longitude,
      };

      this.itinerary = itinerary;

      this.dayColorSvgStringMap =
        this.svgSerivce.getRandomDayColorSvgStringCompositeMap(
          itinerary.tripLength
        );

      this.markers = [];
      itinerary.schedule?.forEach((dailyPlan, i) => {
        dailyPlan?.recommendations.forEach((recommendation) => {
          this.markers.push(convertToLatLngLiteral(recommendation.location));
          recommendation.content = this.getSvg(i);
        });

        dailyPlan.color = this.getColor(dailyPlan.day);
      });

      if (this.map) this.map.fitBounds(getBounds(this.markers));

      this.value = 100;
    }
  }

  getColor(day: number): string {
    return this.dayColorSvgStringMap.dayColorMap[day] as string;
  }

  getSvg(day: number): HTMLElement {
    return this.parser.parseFromString(
      this.dayColorSvgStringMap.daySvgStringMap[day],
      'image/svg+xml'
    ).documentElement;
  }

  focusOnMarker(recommendation: Recommendation): void {
    console.log('FOCUSED');

    const markerPosition = convertToLatLngLiteral(recommendation.location);
    this.map.panTo(markerPosition);
    this.zoom = 16;
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

  backToItineraryList() {
    this.router.navigate(['/itineraries']);
  }
}
