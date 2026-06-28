import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-instructions',
  standalone: true,
  template: `
    <div class="instructions-card">
      <p class="eyebrow">Before you begin</p>
      <h3>Exam instructions</h3>
      <ul>
        <li>Read each question carefully before selecting an answer.</li>
        <li>You can only submit once the quiz is complete.</li>
        <li>Leaving the quiz may prompt you before you continue.</li>
      </ul>
      <div class="actions">
        <button type="button" class="secondary" (click)="cancel.emit()">Cancel</button>
        <button type="button" class="primary" (click)="start.emit()">Start Exam</button>
      </div>
    </div>
  `,
  styles: `
    .instructions-card {
      background: white;
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 16px 40px rgba(15, 23, 42, 0.1);
    }

    .eyebrow {
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: #2563eb;
      font-weight: 700;
      font-size: 0.8rem;
      margin: 0 0 6px;
    }

    h3 {
      margin: 0 0 10px;
      color: #0f172a;
    }

    ul {
      padding-left: 18px;
      color: #475569;
      line-height: 1.7;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 16px;
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
export class InstructionsComponent {
  @Output() start = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
