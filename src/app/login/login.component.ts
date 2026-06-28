import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { QuizActions } from '../state/quiz.actions';
import { QuizState } from '../state/quiz.state';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private store: Store<{ quiz: QuizState }>) {}

  login(): void {
    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    localStorage.setItem('quizUser', this.email.trim());
    this.store.dispatch(QuizActions.login({ userName: this.email.trim() }));
    this.router.navigate(['/dashboard']);
  }
}
