import { Routes } from "@angular/router";
import { CompanionComponent } from "../companion/companion.component";
import { DestinationComponent } from "../destination/destination.component";
import { InterestsComponent } from "../interests/interests.component";
import { PeriodComponent } from "../period/period.component";
<<<<<<< HEAD
import { authGuard } from "src/app/guards/auth/auth.guard";
=======
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b

export const PREFERENCES_ROUTES: Routes = [

    { path: '', redirectTo: 'destination', pathMatch: 'full' },
  
<<<<<<< HEAD
    { path: 'destination', component: DestinationComponent, data: { showNavbar: true }, canActivate: [authGuard] },
    { path: 'period', component: PeriodComponent, data: { showNavbar: true }, canActivate: [authGuard] },
    { path: 'companion', component: CompanionComponent, data: { showNavbar: true }, canActivate: [authGuard] },
    { path: 'interests', component: InterestsComponent, data: { showNavbar: true }, canActivate: [authGuard] },
=======
    { path: 'destination', component: DestinationComponent },
    { path: 'period', component: PeriodComponent },
    { path: 'companion', component: CompanionComponent },
    { path: 'interests', component: InterestsComponent },
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
  
    { path: '**', redirectTo: 'destination' }
  ];