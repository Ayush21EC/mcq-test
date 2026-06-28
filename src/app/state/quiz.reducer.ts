import { createReducer, on } from '@ngrx/store';
import { QuizActions } from './quiz.actions';
import { initialQuizState, QuizState } from './quiz.state';

export const quizReducer = createReducer(
  initialQuizState,
  on(QuizActions.login, (state, { userName }) => ({ ...state, userName })),
  on(QuizActions.setTopic, (state, { topic }) => ({ ...state, topic })),
  on(QuizActions.startExam, (state) => ({ ...state, attempts: state.attempts + 1 })),
  on(QuizActions.setResult, (state, { score }) => ({ ...state, lastScore: score })),
  on(QuizActions.setBestScore, (state, { score }) => ({ ...state, bestScore: score }))
);

export const selectQuizState = (state: { quiz: QuizState }) => state.quiz;
