export interface QuizState {
  userName: string;
  topic: string;
  attempts: number;
  lastScore: string;
  bestScore: string;
}

export const initialQuizState: QuizState = {
  userName: 'Guest',
  topic: 'General Knowledge',
  attempts: 0,
  lastScore: 'Not attempted yet',
  bestScore: '0/0'
};
