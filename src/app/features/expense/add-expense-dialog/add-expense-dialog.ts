import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { Category, ExpenseRequestDto } from '../../../core/models/expense.model';
import { NotificationService } from '../../../core/services/notification.service';
import { ExpenseService } from '../../../core/services/expense.service.ts';

export interface AddExpenseDialogData {
  categories: Category[];
}

@Component({
  selector: 'app-add-expense-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedMaterialModule],
  templateUrl: './add-expense-dialog.html'
})
export class AddExpenseDialog {
  private readonly fb = inject(FormBuilder);
  private readonly expenseService = inject(ExpenseService);
  private readonly notification = inject(NotificationService);
  private readonly dialogRef = inject(MatDialogRef<AddExpenseDialog>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: AddExpenseDialogData) { }

  today = new Date();
  submitting = false;

  expenseForm: FormGroup = this.fb.group({
    categoryId: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(0.01)]],
    expenseDate: [new Date(), Validators.required],
    description: ['']
  });

  onSubmit(): void {
    if (this.expenseForm.invalid || this.submitting) {
      return;
    }

    this.submitting = true;
    const formVal = this.expenseForm.value;

    const formattedDate = formVal.expenseDate instanceof Date
      ? formVal.expenseDate.toISOString().split('T')[0]
      : new Date(formVal.expenseDate).toISOString().split('T')[0];

    const payload: ExpenseRequestDto = {
      userId: 1, // Hardcoded active user placeholder until Auth exists
      categoryId: formVal.categoryId,
      amount: formVal.amount,
      expenseDate: formattedDate,
      description: formVal.description
    };

    this.expenseService.createExpense(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.notification.success('Expense recorded successfully.');
        this.dialogRef.close(true);
      },
      error: () => {
        this.submitting = false;
        this.notification.error('Failed to create expense. Please try again.');
      }
    });
  }
}