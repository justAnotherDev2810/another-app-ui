import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { ExpenseFilterParams, ExpenseResponseDto } from '../../core/models/expense.model';
import { ExpenseService } from '../../core/services/expense.service.ts';
import { NotificationService } from '../../core/services/notification.service';
import { AddExpenseDialog } from './add-expense-dialog/add-expense-dialog';
import { ExpenseTotalSummary } from './expense-total-summary/expense-total-summary';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    ExpenseTotalSummary
  ],
  templateUrl: './expense.component.html'
})
export class Expense implements OnInit {
  readonly expenseService = inject(ExpenseService);
  private readonly dialog = inject(MatDialog);
  private readonly notification = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  displayedColumns: string[] = ['expenseDate', 'categoryName', 'description', 'amount'];
  dataSource = new MatTableDataSource<ExpenseResponseDto>([]);
  isLoading = false;

  filterForm: FormGroup = this.fb.group({
    categoryId: [''],
    startDate: [null],
    endDate: [null]
  });

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadExpenses();

    this.filterForm.valueChanges.subscribe(() => {
      this.loadExpenses();
    });
  }

  loadExpenses(): void {
    this.isLoading = true;
    const filters: ExpenseFilterParams = {
      categoryId: this.filterForm.get('categoryId')?.value || undefined,
      startDate: this.formatDate(this.filterForm.get('startDate')?.value),
      endDate: this.formatDate(this.filterForm.get('endDate')?.value)
    };

    this.expenseService.getExpenses(filters).subscribe({
      next: (res: ExpenseResponseDto[]) => {
        this.dataSource.data = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.notification.error('Failed to load expenses.');
      }
    });

    this.loadTotal(filters);
  }

  loadTotal(filters: ExpenseFilterParams): void {
    this.expenseService.getExpenseTotal(filters).subscribe({
      next: (res: any) => {
        this.expenseService.setTotals(res.total, res.count);
      },
      error: () => {
        this.notification.error('Failed to load totals.');
      }
    });
  }

  private formatDate(date: any): string | undefined {
    if (!date) return undefined;
    return new Date(date).toISOString().split('T')[0];
  }

  onSortChange(event: Sort): void {
    // Sorting can be added later
  }

  openAddExpenseDialog(): void {
    const dialogRef = this.dialog.open(AddExpenseDialog, {
      width: '500px',
      disableClose: true,
      data: { categories: this.expenseService.categories() }
    });

    dialogRef.afterClosed().subscribe((created: boolean) => {
      if (created) {
        this.loadExpenses();
      }
    });
  }
}
