import { Routes } from '@angular/router';
import { ItineraryListComponent } from '../itinerary-list.component';
import { ItineraryViewComponent } from '../itinerary-view/itinerary-view.component';

export const ITINERARY_LIST_ROUTES: Routes = [
  { path: '', component: ItineraryListComponent },
  { path: ':id', component: ItineraryViewComponent },
];
