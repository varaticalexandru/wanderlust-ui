import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { DailyComponent } from '../../itinerary/daily/daily.component';
import { DailyPlan, Itinerary } from 'src/app/models/itinerary.model';
import { SummaryComponent } from '../../itinerary/summary/summary.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SaveItineraryDialogComponent } from '../../itinerary/save-itinerary-dialog/save-itinerary-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    DailyComponent,
    SummaryComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent implements OnInit {
  itinerary!: Itinerary;

  constructor(
    
  ) {

  }


  ngOnInit(): void {
    
  }

  
}
