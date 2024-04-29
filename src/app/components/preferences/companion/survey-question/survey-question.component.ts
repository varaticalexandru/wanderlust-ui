import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { QuestionAnswer, SurveyQuestion } from 'src/app/models/survey-question.model';
import { HighlightPipe } from 'src/app/pipes/highlight/highlight.pipe';

@Component({
  selector: 'app-survey-question',
  standalone: true,
  imports: [
    MatButtonModule,
    HighlightPipe
  ],
  templateUrl: './survey-question.component.html',
  styleUrl: './survey-question.component.scss'
})
export class SurveyQuestionComponent {

  @Input()
  surveyQuestion!: SurveyQuestion;
  
  @Output()
  answerSelected = new EventEmitter<QuestionAnswer>;

  selectedAnswer!: string;

  constructor() {

  }

  handleClick(question: SurveyQuestion, answer: string) {
    this.answerSelected.emit({
      question: question.question,
      answer: answer
    });

    this.selectedAnswer = answer;
  }

}
