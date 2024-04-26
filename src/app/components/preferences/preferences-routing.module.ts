import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinationComponent } from './destination/destination.component';
import { PeriodComponent } from './period/period.component';
import { CompanionComponent } from './companion/companion.component';
import { InterestsComponent } from './interests/interests.component';

const routes: Routes = [
  { path: '', redirectTo: 'destination', pathMatch: 'full' },

  { path: 'destination', component: DestinationComponent },
  { path: 'period', component: PeriodComponent },
  { path: 'companion', component: CompanionComponent },
  { path: 'interests', component: InterestsComponent },

  { path: '**', redirectTo: 'destination' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreferencesRoutingModule { }
