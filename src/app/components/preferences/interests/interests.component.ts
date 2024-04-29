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


@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [
    MatCardModule,
    RouterOutlet,
    ChipsComponent,
    MatChipsModule,
    MatButton,
    ChipsInputComponent
  ],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss'
})
export class InterestsComponent implements OnInit {

  interests!: Array<string>;
  selectedInterests!: Array<string>;
  customInterests!: Array<string>;
  mergedInterests!: Array<string>;
  
  constructor(
    private router: Router,
    private preferencesService: PreferencesService
  ) {
    this.interests = interests;
    this.selectedInterests = [];
    this.customInterests = [];
    this.mergedInterests = [];
  }

  ngOnInit(): void {

  }

  updateSelection($event: any) {
    this.selectedInterests = $event as Array<string>;
  }

  back() {
    this.router.navigate(['/preferences/companion']);
  }

  next() {
    this.mergedInterests = this.selectedInterests.concat(this.customInterests.filter((option) => this.selectedInterests.indexOf(option) < 0));
    this.preferencesService.setPreference('interests', this.mergedInterests);

    this.preferencesService.getPreferences().subscribe(
      (preferences: Preferences) => {
        console.log(preferences);
      }
    )
  }




}
