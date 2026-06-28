import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizLeaveGuard } from './quiz/quiz-leave.guard';
import { InstructionsPageComponent } from './instructions/instructions-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'instructions', component: InstructionsPageComponent },
  {
    path: 'quiz',
    component: QuizComponent,
    canDeactivate: [QuizLeaveGuard]
  },
  { path: '**', redirectTo: 'login' }
];
