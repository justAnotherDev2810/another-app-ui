import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { Category, ExpenseRequestDto } from '../../../core/models/expense.model';
import { NotificationService } from '../../../core/services/notification.service';
import { ExpenseService } from '../../../core/services/expense.service.ts';

function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const selectedDate = new Date(control.value);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return selectedDate > today ? { futureDate: true } : null;
}

@Component({
  selector: 'app-add-expense-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedMaterialModule],
  templateUrl: './add-expense-dialog.html'
})
export class AddExpenseDialog {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef);
  private readonly expenseService = inject(ExpenseService);
  private readonly notification = inject(NotificationService);
  readonly categories: Category[] = inject(MAT_DIALOG_DATA)?.categories || [];
  submitting = false;

  expenseForm: FormGroup = this.fb.group({
    amount: ['', [Validators.required, Validators.min(0)]],
    categoryId: ['', [Validators.required]],
    description: [''],
    expenseDate: [new Date(), [Validators.required, futureDateValidator]]
  });

  onSubmit(): void {
    if (this.expenseForm.invalid || this.submitting) return;

    this.submitting = true;
    const formVal = this.expenseForm.value;
    const dateObj: Date = formVal.expenseDate;
    const formattedDate = dateObj.toISOString().split('T')[0];

    const payload: ExpenseRequestDto = {
      userId: 1, // Hardcoded active user placeholder until Auth exists
      categoryId: formVal.categoryId,
      amount: formVal.amount,
      description: formVal.description,
      expenseDate: formattedDate
    };

    this.expenseService.createExpense(payload).subscribe({
      next: (res) => {
        this.submitting = false;
        console.log("Response: " + res);
        this.notification.success('Expense recorded successfully!: ');
        this.dialogRef.close(true); // Close and trigger reload
      },
      error: (err) => {
        this.submitting = false;
        console.log("Error: " + err);
        // Keep dialog open on failure, notify via snackbar
        const msg = err?.error?.message || 'Failed to add expense. Please try again.';
        this.notification.error(msg);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
