import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinationComponent } from './destination/destination.component';

const routes: Routes = [
  { path: '', redirectTo: 'destination', pathMatch: 'full' },
  { path: 'destination', component: DestinationComponent },

  { path: '**', redirectTo: 'destination' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreferencesRoutingModule { }
