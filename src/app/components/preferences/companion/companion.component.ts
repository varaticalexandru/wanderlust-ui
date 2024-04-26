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
import { QuestionAnswer, SurveyQuestion } from 'src/app/models/survey-question.model';
import { questionnaire } from 'src/app/data/companion-questionnaire.data';

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
    SurveyQuestionComponent
  ],
  templateUrl: './companion.component.html',
  styleUrl: './companion.component.scss'
})
export class CompanionComponent implements OnInit {
  
  companions!: Array<Companion>;
  selectedCompanion!: Companion;
  questionAnswerMap = new Map<string, boolean>;
  questionnaire!: Array<SurveyQuestion>;

  constructor(
    private router: Router,
    private preferencesService: PreferencesService
  ) {
    this.companions = companions;
    this.questionnaire = questionnaire;
  }

  ngOnInit(): void {
    
  }

  handleCompanionClick(companion: Companion) {
    this.selectedCompanion = companion;
  }

  handleAnswerSelected(answer: QuestionAnswer) {
    this.questionAnswerMap.set(
      (answer.question as string).includes('pets') ? 'pets' : 'children', 
      answer.answer === "Yes" ? true : false
    );    
  }

  next() {
    this.preferencesService.setPreference('companion', this.selectedCompanion.title);
    this.preferencesService.setPreference('pets', this.questionAnswerMap.get('pets') as boolean);
    this.preferencesService.setPreference('children', this.questionAnswerMap.get('children') as boolean);

    this.router.navigate(['/preferences/interests']);
  }

  back() {
    this.router.navigate(['/preferences/period']);
  }

}
