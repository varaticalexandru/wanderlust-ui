import { Component, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { Companion } from 'src/app/models/companion.model';
import { companions } from 'src/app/data/companion.data';
import { CompanionCardComponent } from './companion-card/companion-card.component';
import { PreferencesService } from 'src/app/services/preferences/preferences.service';
import { Preferences } from 'src/app/models/preferences.model';
import { SurveyQuestionComponent } from './survey-question/survey-question.component';
import {
  QuestionAnswer,
  SurveyQuestion,
} from 'src/app/models/survey-question.model';
import { questionnaire } from 'src/app/data/companion-questionnaire.data';
import { priceLevels } from 'src/app/data/budget.data';
import { BudgetCardComponent } from './budget-card/budget-card.component';
import { KeyValuePipe } from '@angular/common';
import { PriceLevel } from 'src/app/models/price-level.model';

@Component({
  selector: 'app-companion',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    CompanionCardComponent,
    SurveyQuestionComponent,
    BudgetCardComponent,
    KeyValuePipe,
  ],
  templateUrl: './companion.component.html',
  styleUrl: './companion.component.scss',
})
export class CompanionComponent implements OnInit {
  companions!: Array<Companion>;
  selectedCompanion!: Companion;
  selectedPriceLevel!: PriceLevel;
  questionAnswerMap = new Map<string, boolean>();
  questionnaire!: Array<SurveyQuestion>;
  priceLevels: Array<PriceLevel>;

  constructor(
    private router: Router,
    private preferencesService: PreferencesService
  ) {
    this.companions = companions;
    this.questionnaire = questionnaire;
    this.priceLevels = priceLevels;
  }

  ngOnInit(): void {}

  handleCompanionClick(companion: Companion) {
    this.selectedCompanion = companion;
  }

  handleAnswerSelected(answer: QuestionAnswer) {
    this.questionAnswerMap.set(
      (answer.question as string).includes('pets') ? 'pets' : 'children',
      answer.answer === 'Yes' ? true : false
    );
  }

  handlePriceClick(priceLevel: PriceLevel) {
    this.selectedPriceLevel = priceLevel; 
  }

  next() {
    this.preferencesService.setPreference(
      'companion',
      this.selectedCompanion.title
    );
    this.preferencesService.setPreference(
      'pets',
      this.questionAnswerMap.get('pets') as boolean
    );
    this.preferencesService.setPreference(
      'children',
      this.questionAnswerMap.get('children') as boolean
    );
    this.preferencesService.setPreference(
      'priceLevel',
      this.selectedPriceLevel.name
    );

    console.log(this.preferencesService.getPreferences());
    

    this.router.navigate(['/preferences/interests']);
  }

  back() {
    this.router.navigate(['/preferences/period']);
  }
}
