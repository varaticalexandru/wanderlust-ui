import { Routes } from '@angular/router';
import { ItineraryListComponent } from '../itinerary-list.component';
import { ItineraryViewComponent } from '../itinerary-view/itinerary-view.component';
<<<<<<< HEAD
import { authGuard } from 'src/app/guards/auth/auth.guard';

export const ITINERARY_LIST_ROUTES: Routes = [
  { path: '', component: ItineraryListComponent, data: { showNavbar: true }, canActivate: [authGuard] },
  { path: ':id', component: ItineraryViewComponent, data: { showNavbar: true }, canActivate: [authGuard] },
=======

export const ITINERARY_LIST_ROUTES: Routes = [
  { path: '', component: ItineraryListComponent },
  { path: ':id', component: ItineraryViewComponent },
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
];
