import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationModalComponent } from '../shared/confirmation-modal.component';
import { QuizActions } from '../state/quiz.actions';
import { selectQuizState } from '../state/quiz.reducer';
import { QuizState } from '../state/quiz.state';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ConfirmationModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  quiz$;
  userName = localStorage.getItem('quizUser') ?? 'Guest';
  lastScore = localStorage.getItem('quizResult') ?? 'Not attempted yet';
  topic = localStorage.getItem('quizTopic') ?? 'General Knowledge';
  showLogoutModal = false;
  selectedTopic = 'General Knowledge';
  attempts = Number(localStorage.getItem('quizAttempts') ?? '0');
  bestScore = localStorage.getItem('quizBestScore') ?? '0/0';

  constructor(private router: Router, private store: Store<{ quiz: QuizState }>) {
    this.quiz$ = this.store.select(selectQuizState);
    this.quiz$.subscribe((state) => {
      this.userName = state.userName;
      this.topic = state.topic;
      this.attempts = state.attempts;
      this.lastScore = state.lastScore;
      this.bestScore = state.bestScore;
    });
  }

  startQuiz(topic: string): void {
    this.selectedTopic = topic;
    localStorage.setItem('quizTopic', topic);
    this.store.dispatch(QuizActions.setTopic({ topic }));
    this.store.dispatch(QuizActions.startExam());
    this.router.navigate(['/instructions']);
  }

  requestLogout(): void {
    this.showLogoutModal = true;
  }

  confirmLogout(): void {
    localStorage.removeItem('quizUser');
    this.router.navigate(['/login']);
  }

  cancelLogout(): void {
    this.showLogoutModal = false;
  }
}
