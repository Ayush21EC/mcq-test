import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructions-page',
  standalone: true,
  template: `
    <section class="instructions-shell">
      <div class="instructions-card">
        <p class="eyebrow">Before you begin</p>
        <h1>Exam instructions</h1>
        <ul>
          <li>Read each question carefully before selecting an answer.</li>
          <li>You can submit the quiz only after answering all questions.</li>
          <li>Leaving the quiz may ask for confirmation before you continue.</li>
        </ul>
        <div class="actions">
          <button type="button" class="secondary" (click)="goBack()">Back</button>
          <button type="button" class="primary" (click)="startExam()">Start Exam</button>
        </div>
      </div>
    </section>
  `,
  styles: `
    .instructions-shell {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
      background: linear-gradient(135deg, #eff6ff, #f8fafc);
    }

    .instructions-card {
      width: min(100%, 560px);
      background: white;
      border-radius: 24px;
      padding: 28px;
      box-shadow: 0 18px 50px rgba(15, 23, 42, 0.12);
    }

    .eyebrow {
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: #2563eb;
      font-weight: 700;
      font-size: 0.8rem;
      margin: 0 0 8px;
    }

    h1 {
      margin: 0 0 12px;
      color: #0f172a;
    }

    ul {
      padding-left: 18px;
      line-height: 1.8;
      color: #475569;
      margin-bottom: 18px;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    button {
      border: none;
      border-radius: 999px;
      padding: 10px 14px;
      cursor: pointer;
      font-weight: 600;
    }

    .secondary {
      background: #e2e8f0;
      color: #0f172a;
    }

    .primary {
      background: #2563eb;
      color: white;
    }
  `
})
export class InstructionsPageComponent {
  constructor(private router: Router) {}

  startExam(): void {
    this.router.navigate(['/quiz']);
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
