import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationModalComponent } from '../shared/confirmation-modal.component';
import { QuizActions } from '../state/quiz.actions';
import { QuizState } from '../state/quiz.state';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [FormsModule, ConfirmationModalComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  topic = localStorage.getItem('quizTopic') ?? 'General Knowledge';
  questions = [
    {
      prompt: 'Which Angular feature is used to create reusable UI components?',
      options: ['Directive', 'Component', 'Service', 'Module'],
      answer: 'Component'
    },
    {
      prompt: 'What does HTML stand for?',
      options: ['Hyper Trainer Marking Language', 'Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'High Transfer Markup Language'],
      answer: 'Hyper Text Markup Language'
    },
    {
      prompt: 'Which keyword is used to declare a constant in JavaScript?',
      options: ['let', 'var', 'const', 'static'],
      answer: 'const'
    }
  ];

  answers: Record<number, string> = {};
  submitted = false;
  score = 0;
  showLeaveModal = false;

  constructor(private router: Router, private store: Store<{ quiz: QuizState }>) {}

  submitQuiz(): void {
    this.score = this.questions.reduce((total, question, index) => {
      return total + (this.answers[index] === question.answer ? 1 : 0);
    }, 0);

    this.submitted = true;
    const scoreText = `${this.score}/${this.questions.length}`;
    const currentBest = localStorage.getItem('quizBestScore') ?? '0/0';
    const [bestMarks, bestTotal] = currentBest.split('/').map(Number);
    const [scoreMarks, scoreTotal] = [`${this.score}`, `${this.questions.length}`].map(Number);

    if (scoreMarks > bestMarks || (scoreMarks === bestMarks && scoreTotal > bestTotal)) {
      localStorage.setItem('quizBestScore', scoreText);
      this.store.dispatch(QuizActions.setBestScore({ score: scoreText }));
    }

    localStorage.setItem('quizResult', scoreText);
    this.store.dispatch(QuizActions.setResult({ score: scoreText }));
  }

  restart(): void {
    this.answers = {};
    this.submitted = false;
    this.score = 0;
  }

  requestLeave(): void {
    this.showLeaveModal = true;
  }

  confirmLeave(): void {
    this.showLeaveModal = false;
    this.router.navigate(['/dashboard']);
  }

  cancelLeave(): void {
    this.showLeaveModal = false;
  }

  goHome(): void {
    if (this.submitted || Object.keys(this.answers).length === 0) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.requestLeave();
  }
}
