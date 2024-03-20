import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinationComponent } from './destination/destination.component';
import { PeriodComponent } from './period/period.component';

const routes: Routes = [
  { path: '', redirectTo: 'destination', pathMatch: 'full' },

  { path: 'destination', component: DestinationComponent },
  { path: 'period', component: PeriodComponent },

  { path: '**', redirectTo: 'destination' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreferencesRoutingModule { }
