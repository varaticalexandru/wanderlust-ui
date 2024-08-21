import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Itinerary } from 'src/app/models/itinerary.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-itinerary-card',
  standalone: true,
  imports: [
    MatCardModule, 
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './itinerary-card.component.html',
  styleUrl: './itinerary-card.component.scss',
})
export class ItineraryCardComponent implements OnInit, AfterViewInit {
  
  @Input() itinerary!: Itinerary;
  @Input() image!: string;
  @Output() deleteItinerary = new EventEmitter<string>();
  @Output() viewItinerary = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
<<<<<<< HEAD
<<<<<<< HEAD
=======
    console.log(this.itinerary);
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
=======
    console.log(this.itinerary);
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
    
  }


  handleDeleteItineraryClick() {
    this.deleteItinerary.emit(this.itinerary.id);
  }

  handleViewItineraryClick() {
    this.viewItinerary.emit(this.itinerary.id);
  }

  evaluateLogicalValue(value: any): boolean {
    return !!value;
  }
}
