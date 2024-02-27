import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferencesRoutingModule } from './preferences-routing.module';
import { DestinationComponent } from './destination/destination.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { PopularDestinationComponent } from './destination/popular-destination/popular-destination.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';



@NgModule({
  declarations: [
    DestinationComponent,
    PopularDestinationComponent,
    SearchFilterPipe,
  ],
  imports: [
    CommonModule,
    PreferencesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    MaterialModule,
  ]
})
export class PreferencesModule { }
