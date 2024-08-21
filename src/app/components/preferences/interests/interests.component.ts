import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterOutlet } from '@angular/router';
import { Preferences } from 'src/app/models/preferences.model';
import { PreferencesService } from 'src/app/services/preferences/preferences.service';
import { ChipsComponent } from './chips/chips.component';
import { interests } from 'src/app/data/interests.data';
import { MatChipsModule } from '@angular/material/chips';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ChipsInputComponent } from './chips-input/chips-input.component';
import { CategoryInterests } from 'src/app/models/interests.model';
import { MatDividerModule } from '@angular/material/divider';
import { InterestSelection } from 'src/app/models/itinerary.model';
<<<<<<< HEAD
<<<<<<< HEAD
import { FooterComponent } from '../../footer/footer.component';
=======
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
=======
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [
    MatCardModule,
    RouterOutlet,
    ChipsComponent,
    MatChipsModule,
    MatButton,
    ChipsInputComponent,
    MatDividerModule,
<<<<<<< HEAD
<<<<<<< HEAD
    FooterComponent,
=======
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
=======
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
  ],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss',
})
export class InterestsComponent implements OnInit {
  selectedInterests = new Map<number, Array<string>>();
  plainSelectedInterests!: Array<string>;
  customInterests!: Array<string>;
  mergedInterests!: Array<string>;
  interests!: Array<CategoryInterests>;

  constructor(
    private router: Router,
    private preferencesService: PreferencesService
  ) {
    this.interests = interests;
    this.customInterests = [];
    this.mergedInterests = [];
    this.plainSelectedInterests = [];
  }

  ngOnInit(): void {}

  updateSelection(interestSelection: InterestSelection) {
    
    this.selectedInterests.set(interestSelection.ordinal, interestSelection.selectedOptions);
  }

  back() {
    this.router.navigate(['/preferences/companion']);
  }

  next() {

    this.selectedInterests.forEach((value: Array<string>, key: number, map) => {
      value.forEach(interest => this.plainSelectedInterests.push(interest.slice(2).trim()))
    })

    this.mergedInterests = this.plainSelectedInterests.concat(
      this.customInterests.filter(
        (customInterest) => this.plainSelectedInterests.indexOf(customInterest) < 0 
      )
    );

    this.mergedInterests = this.mergedInterests.filter(
      (interest, index, self) => self.findIndex((t) => t.toLowerCase() === interest.toLowerCase()) === index
    );

    this.preferencesService.setPreference('interests', this.mergedInterests);

    this.router.navigate(['/itinerary']);
  }
}
