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
  private readonly expenseService = inject(ExpenseService);
  private readonly dialog = inject(MatDialog);
  private readonly notification = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  categories: Category[] = [];
  expenses: ExpenseResponseDto[] = [];
  displayedColumns: string[] = ['expenseDate', 'categoryName', 'description', 'amount'];

  // Table State
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  sortField = 'expenseDate';
  sortDirection = 'desc';
  loading = false;

  // Total Summary State
  totalAmount = 0;
  totalCount = 0;

  // Filter Form
  filterForm: FormGroup = this.fb.group({
    categoryId: [''],
    startDate: [null],
    endDate: [null]
  });
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadCategories();
    this.fetchDataAndTotal();

    // Listen to Filter Bar changes -> reset page to 0 and refetch both
    this.filterForm.valueChanges.subscribe(() => {
      this.pageIndex = 0;
      if (this.paginator) {
        this.paginator.pageIndex = 0;
      }
      this.fetchDataAndTotal();
    });
  }

  loadCategories(): void {
    this.expenseService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log("Data: ", data);
        console.log("Categories: ", this.categories);
        this.cdr.markForCheck();
      },
      error: () => this.notification.error('Failed to load expense categories.')
    });
  }

  fetchDataAndTotal(): void {
    this.fetchTableData();
    this.fetchTotalSummary();
  }

  fetchTableData(): void {
    this.loading = true;
    const filters: ExpenseFilterParams = {
      ...this.currentFilterParams,
      page: this.pageIndex,
      size: this.pageSize,
      sort: `\({this.sortField},\){this.sortDirection}`
    };

    this.expenseService.getAllExpenses().subscribe({
      next: (res) => {
        this.expenses = res.content;
        this.totalElements = res.numberOfElements;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.notification.error('Failed to load expenses list.');
      }
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

  fetchTotalSummary(): void {
    this.expenseService.getExpenseTotal(this.currentFilterParams).subscribe({
      next: (res) => {
        console.log('Total Response:', res);
        this.totalAmount = res.total;
        this.totalCount = res.count;
        console.log('Updated totalAmount:', this.totalAmount, 'totalCount:', this.totalCount);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching totals:', err);
        this.notification.error('Failed to fetch expense totals.');
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchTableData();
  }

  onSortChange(event: any): void {
    const sort = event as Sort;
    this.sortField = sort.active || 'expenseDate';
    this.sortDirection = sort.direction || 'desc';
    this.fetchTableData();
  }

  openAddExpenseDialog(): void {
    const dialogRef = this.dialog.open(AddExpenseDialog, {
      width: '500px',
      disableClose: true,
      data: { categories: this.categories }
    });

    dialogRef.afterClosed().subscribe((created: boolean) => {
      if (created) {
        // Refetch both table and total summary on success
        this.fetchDataAndTotal();
      }
    });
  }
}
