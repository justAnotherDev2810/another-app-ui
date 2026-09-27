import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { ExpenseFilterParams, ExpenseResponseDto } from '../../../core/models/expense.model';
import { NotificationService } from '../../../core/services/notification.service';
import { AddExpenseDialog } from '../add-expense-dialog/add-expense-dialog';
import { ExpenseTotalSummary } from '../expense-total-summary/expense-total-summary';
import { ExpenseService } from '../../../core/services/expense.service.ts';

@Component({
    selector: 'app-expense-transactions',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedMaterialModule,
        ExpenseTotalSummary
    ],
    templateUrl: './expense-transactions.component.html'
})
export class ExpenseTransactionsComponent implements OnInit {
    readonly expenseService = inject(ExpenseService);
    private readonly dialog = inject(MatDialog);
    private readonly notification = inject(NotificationService);
    private readonly fb = inject(FormBuilder);

    displayedColumns: string[] = ['categoryName', 'description', 'expenseDate', 'amount'];
    dataSource = new MatTableDataSource<ExpenseResponseDto>([]);
    isLoading = false;

    filterForm: FormGroup = this.fb.group({
        search: [''],
        categoryId: [''],
        startDate: [null],
        endDate: [null]
    });

    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit(): void {
        // Load initial data on page load
        this.loadExpenses();
    }

    ngAfterViewInit(): void {
        this.filterForm.valueChanges.subscribe(() => {
            this.loadFilteredExpenses();
        });
    }

    loadExpenses(){
        this.isLoading = true;
        this.expenseService.getAllExpenses().subscribe({
            next: (res: ExpenseResponseDto[]) => {
                this.dataSource.data = res;
                this.isLoading = false;
                this.notification.success("Loaded all expenses");
            },
            error: () => {
                this.isLoading = false;
                this.notification.error('Failed to load expenses.');
            }
        });

        this.loadTotal({});
    }

    loadFilteredExpenses(): void {
        this.isLoading = true;
        const filters: ExpenseFilterParams = {
            categoryId: this.filterForm.get('categoryId')?.value || undefined,
            startDate: this.formatDate(this.filterForm.get('startDate')?.value),
            endDate: this.formatDate(this.filterForm.get('endDate')?.value)
        };

        this.expenseService.getFilteredExpenses(filters).subscribe({
            next: (res: ExpenseResponseDto[]) => {
                const searchTerm = this.filterForm.get('search')?.value?.toLowerCase().trim();
                if (searchTerm) {
                    this.dataSource.data = res.filter(item =>
                        item.description?.toLowerCase().includes(searchTerm) ||
                        item.categoryName?.toLowerCase().includes(searchTerm)
                    );
                } else {
                    this.dataSource.data = res;
                }
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
        // Sorting handler placeholder
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