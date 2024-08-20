import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
<<<<<<< HEAD
import { DailyPlan, Recommendation } from 'src/app/models/itinerary.model';
import { makeColorPale } from 'src/app/utils/colors';
import {MatExpansionModule} from '@angular/material/expansion';
=======
import { DailyPlan, Itinerary, Recommendation } from 'src/app/models/itinerary.model';
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
import '@googlemaps/extended-component-library/place_overview.js';
import '@googlemaps/extended-component-library/place_building_blocks/place_directions_button.js';

@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [
    MatCardModule,
<<<<<<< HEAD
    MatStepperModule,
    MatExpansionModule,
=======
    MatStepperModule  
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
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

<<<<<<< HEAD
  makeColorPale = makeColorPale;

=======
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
  constructor() {}

  ngOnInit(): void {}
  
  ngOnDestroy(): void {}

  recommendationClick(recommendationIdx: number) {
    this.recommendationClicked.emit(
      this.dayPlan.recommendations[recommendationIdx]
    );
  }

}
