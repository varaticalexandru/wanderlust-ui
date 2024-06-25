import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { DailyPlan, Recommendation } from 'src/app/models/itinerary.model';
import { makeColorPale } from 'src/app/utils/colors';
import {MatExpansionModule} from '@angular/material/expansion';
import '@googlemaps/extended-component-library/place_overview.js';
import '@googlemaps/extended-component-library/place_building_blocks/place_directions_button.js';

@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [
    MatCardModule,
    MatStepperModule,
    MatExpansionModule,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.scss'
})
export class DailyComponent implements OnInit, OnDestroy {
  
  @Input() dayPlan!: DailyPlan;  
  @Input() color!: string;
  
  @Output() recommendationClicked = new EventEmitter<Recommendation>;

  makeColorPale = makeColorPale;

  constructor() {}

  ngOnInit(): void {}
  
  ngOnDestroy(): void {}

  recommendationClick(recommendationIdx: number) {
    this.recommendationClicked.emit(
      this.dayPlan.recommendations[recommendationIdx]
    );
  }

}
