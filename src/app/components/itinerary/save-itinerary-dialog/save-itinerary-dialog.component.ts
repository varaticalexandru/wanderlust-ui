import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Itinerary } from 'src/app/models/itinerary.model';
import { ItineraryService } from 'src/app/services/itinerary/itinerary.service';

@Component({
  selector: 'app-save-itinerary-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './save-itinerary-dialog.component.html',
  styleUrl: './save-itinerary-dialog.component.scss',
})
export class SaveItineraryDialogComponent implements OnInit {
  
  itinerary!: Itinerary;
  itineraryName!: string;

  constructor(
    private dialogRef: MatDialogRef<SaveItineraryDialogComponent>,
    private itineraryService: ItineraryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.itinerary = data.itinerary;
  }

  ngOnInit(): void {
    this.itineraryName = `${this.itinerary.companion} trip to ${this.itinerary.cityName}, ${this.itinerary.countryName} for ${this.itinerary.tripLength} days`;
  }

  save() {
    this.dialogRef.close(this.itineraryName);
  }

  cancel() {
    this.dialogRef.close('');
  }
}
