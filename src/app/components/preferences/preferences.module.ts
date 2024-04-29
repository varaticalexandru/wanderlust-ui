import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferencesRoutingModule } from './preferences-routing.module';
import { DestinationComponent } from './destination/destination.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { PopularDestinationCardComponent } from './destination/popular-destination-card/popular-destination-card.component';
import { SearchFilterPipe } from '../../pipes/search-filter/search-filter.pipe';
import { SearchResultCardComponent } from './destination/search-result-card/search-result-card.component';
import { PeriodComponent } from './period/period.component';

import { IgxDateRangePickerModule } from 'igniteui-angular';

import { HammerModule } from '@angular/platform-browser';



@NgModule({
    imports: [
    CommonModule,
    PreferencesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    IgxDateRangePickerModule,
    HammerModule,
    DestinationComponent,
    PopularDestinationCardComponent,
    SearchFilterPipe,
    SearchResultCardComponent,
    PeriodComponent,
],
    bootstrap: []
})
export class PreferencesModule { }
