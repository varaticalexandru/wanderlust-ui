import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferencesRoutingModule } from './preferences-routing.module';
import { DestinationComponent } from './destination/destination.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { PopularDestinationCardComponent } from './destination/popular-destination-card/popular-destination-card.component';
import { SearchFilterPipe } from '../../pipes/search-filter.pipe';
import { SearchResultCardComponent } from './destination/search-result-card/search-result-card.component';
import { PeriodComponent } from './period/period/period.component';



@NgModule({
  declarations: [
    DestinationComponent,
    PopularDestinationCardComponent,
    SearchFilterPipe,
    SearchResultCardComponent,
    PeriodComponent,
  ],
  imports: [
    CommonModule,
    PreferencesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    MaterialModule,
  ],
  bootstrap: []
})
export class PreferencesModule { }
