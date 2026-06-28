import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const QuizActions = createActionGroup({
  source: 'Quiz',
  events: {
    login: props<{ userName: string }>(),
    setTopic: props<{ topic: string }>(),
    startExam: emptyProps(),
    setResult: props<{ score: string }>(),
    setBestScore: props<{ score: string }>()
  }
});
