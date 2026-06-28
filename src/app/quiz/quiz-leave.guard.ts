import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { QuizComponent } from './quiz.component';

@Injectable({ providedIn: 'root' })
export class QuizLeaveGuard implements CanDeactivate<QuizComponent> {
  canDeactivate(component: QuizComponent): boolean {
    if (component.submitted || Object.keys(component.answers).length === 0) {
      return true;
    }

    return window.confirm('You have unsaved quiz answers. Are you sure you want to leave this quiz?');
  }
}
