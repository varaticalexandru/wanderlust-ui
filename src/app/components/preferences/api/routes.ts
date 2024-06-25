import { Routes } from "@angular/router";
import { CompanionComponent } from "../companion/companion.component";
import { DestinationComponent } from "../destination/destination.component";
import { InterestsComponent } from "../interests/interests.component";
import { PeriodComponent } from "../period/period.component";
import { authGuard } from "src/app/guards/auth/auth.guard";

export const PREFERENCES_ROUTES: Routes = [

    { path: '', redirectTo: 'destination', pathMatch: 'full' },
  
    { path: 'destination', component: DestinationComponent, data: { showNavbar: true }, canActivate: [authGuard] },
    { path: 'period', component: PeriodComponent, data: { showNavbar: true }, canActivate: [authGuard] },
    { path: 'companion', component: CompanionComponent, data: { showNavbar: true }, canActivate: [authGuard] },
    { path: 'interests', component: InterestsComponent, data: { showNavbar: true }, canActivate: [authGuard] },
  
    { path: '**', redirectTo: 'destination' }
  ];