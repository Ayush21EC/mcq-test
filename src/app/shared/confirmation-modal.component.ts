import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  template: `
    @if (isOpen) {
      <div class="modal-backdrop" (click)="cancel()">
        <div class="modal-card" (click)="$event.stopPropagation()">
          <h3>{{ title }}</h3>
          <p>{{ message }}</p>
          <div class="actions">
            <button type="button" class="secondary" (click)="cancel()">Cancel</button>
            <button type="button" class="primary" (click)="confirm()">Confirm</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.55);
      display: grid;
      place-items: center;
      z-index: 1000;
      padding: 20px;
    }

    .modal-card {
      background: white;
      width: min(100%, 420px);
      border-radius: 18px;
      padding: 24px;
      box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25);
    }

    h3 {
      margin: 0 0 8px;
      color: #0f172a;
    }

    p {
      margin: 0 0 20px;
      color: #475569;
      line-height: 1.5;
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
export class ConfirmationModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Are you sure?';
  @Input() message = 'Please confirm this action.';
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirm(): void {
    this.confirmed.emit();
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
