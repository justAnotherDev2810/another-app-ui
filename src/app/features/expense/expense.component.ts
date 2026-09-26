import { Component, inject, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { Category, ExpenseFilterParams, ExpenseResponseDto } from '../../core/models/expense.model';
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

  // Table State
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  sortField = 'expenseDate';
  sortDirection = 'desc';

  // Filter Form
  filterForm: FormGroup = this.fb.group({
    categoryId: [''],
    startDate: [null],
    endDate: [null]
  });
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.expenseService.loadExpenses();
    this.expenseService.loadExpenseTotal(this.currentFilterParams);

    // Listen to Filter Bar changes -> reset page to 0 and refetch both
    this.filterForm.valueChanges.subscribe(() => {
      this.pageIndex = 0;
      if (this.paginator) {
        this.paginator.pageIndex = 0;
      }
      this.expenseService.loadExpenses();
      this.expenseService.loadExpenseTotal(this.currentFilterParams);
    });
  }

  get currentFilterParams(): ExpenseFilterParams {
    const val = this.filterForm.value;
    const startDate = val.startDate ? new Date(val.startDate).toISOString().split('T')[0] : undefined;
    const endDate = val.endDate ? new Date(val.endDate).toISOString().split('T')[0] : undefined;

    return {
      categoryId: val.categoryId || undefined,
      startDate,
      endDate
    };
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  onSortChange(event: any): void {
    const sort = event as Sort;
    this.sortField = sort.active || 'expenseDate';
    this.sortDirection = sort.direction || 'desc';
  }

  openAddExpenseDialog(): void {
    const dialogRef = this.dialog.open(AddExpenseDialog, {
      width: '500px',
      disableClose: true,
      data: { categories: this.expenseService.categories() }
    });

    dialogRef.afterClosed().subscribe((created: boolean) => {
      if (created) {
        // Refetch both expenses and total summary on success
        this.expenseService.loadExpenses();
        this.expenseService.loadExpenseTotal(this.currentFilterParams);
      }
    });
  }
}
