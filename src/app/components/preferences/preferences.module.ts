import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferencesRoutingModule } from './preferences-routing.module';
import { DestinationComponent } from './destination/destination.component';


@NgModule({
  declarations: [
    DestinationComponent,
  ],
  imports: [
    CommonModule,
    PreferencesRoutingModule,
  ]
})
export class PreferencesModule { }
