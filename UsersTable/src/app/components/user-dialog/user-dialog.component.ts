import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDialogComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() mode: 'add' | 'edit' = 'add';
  @Input() user: User = {
    id: 0,
    name: '',
    email: '',
    role: 'Developer'
  };

  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onHide(): void {
    this.visibleChange.emit(false);
  }

  onCancel(): void {
    this.cancel.emit();
    this.visibleChange.emit(false);
  }

  onSave(): void {
    this.save.emit();
  }
}
