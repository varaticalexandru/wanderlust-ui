import { Routes } from "@angular/router";
import { CompanionComponent } from "../companion/companion.component";
import { DestinationComponent } from "../destination/destination.component";
import { InterestsComponent } from "../interests/interests.component";
import { PeriodComponent } from "../period/period.component";

export const PREFERENCES_ROUTES: Routes = [

    { path: '', redirectTo: 'destination', pathMatch: 'full' },
  
    { path: 'destination', component: DestinationComponent },
    { path: 'period', component: PeriodComponent },
    { path: 'companion', component: CompanionComponent },
    { path: 'interests', component: InterestsComponent },
  
    { path: '**', redirectTo: 'destination' }
  ];