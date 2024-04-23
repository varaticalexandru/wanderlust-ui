import { SurveyQuestion } from "../models/survey-question.model";

export let questionnaire: Array<SurveyQuestion> = [
    {
        question: 'Are you traveling with <strong>pets</strong> ?',
        answers: ['Yes', 'No']
      },
      {
        question: 'Are you traveling with <strong>children</strong> ?',
        answers: ['Yes', 'No']
      }
];