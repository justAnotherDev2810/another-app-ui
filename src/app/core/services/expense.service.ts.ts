import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api-endpoints.constants';
import {
    Category,
    ExpenseRequestDto,
    ExpenseFilterParams,
    ExpenseResponseDto,
    ExpenseTotalResponse
} from '../models/expense.model';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private readonly http = inject(HttpClient);
    private readonly notification = inject(NotificationService);

    // Signals for totals
    private readonly _totalAmount = signal<number>(0);
    private readonly _totalCount = signal<number>(0);
    private readonly _categories = signal<Category[]>([]);
    private readonly _loading = signal<boolean>(false);

    // Public readonly selectors
    readonly totalAmount = this._totalAmount.asReadonly();
    readonly totalCount = this._totalCount.asReadonly();
    readonly categories = this._categories.asReadonly();
    readonly loading = this._loading.asReadonly();

    constructor() {
        this.loadCategories();
    }

    // Load categories
    loadCategories(): void {
        this._loading.set(true);
        this.http.get<Category[]>(API_ENDPOINTS.CATEGORIES.BASE).subscribe({
            next: (data) => {
                this._categories.set(data);
                this._loading.set(false);
            },
            error: () => {
                this._loading.set(false);
                this.notification.error('Failed to load expense categories.');
            }
        });
    }

    // Get expenses as Observable list
    getExpenses(filters: ExpenseFilterParams): Observable<ExpenseResponseDto[]> {
        let params = new HttpParams();
        if (filters.categoryId) params = params.set('categoryId', filters.categoryId);
        if (filters.startDate) params = params.set('startDate', filters.startDate);
        if (filters.endDate) params = params.set('endDate', filters.endDate);

        return this.http.get<ExpenseResponseDto[]>(API_ENDPOINTS.EXPENSES.BASE, { params });
    }

    // Get total expense summary
    getExpenseTotal(filters: ExpenseFilterParams): Observable<ExpenseTotalResponse> {
        let params = new HttpParams();
        if (filters.categoryId) params = params.set('categoryId', filters.categoryId);
        if (filters.startDate) params = params.set('startDate', filters.startDate);
        if (filters.endDate) params = params.set('endDate', filters.endDate);

        return this.http.get<ExpenseTotalResponse>(API_ENDPOINTS.EXPENSES.TOTAL, { params });
    }

    // Create new expense
    createExpense(payload: ExpenseRequestDto): Observable<ExpenseResponseDto> {
        return this.http.post<ExpenseResponseDto>(API_ENDPOINTS.EXPENSES.BASE, payload);
    }

    // Simple setter for totals
    setTotals(total: number, count: number): void {
        this._totalAmount.set(total);
        this._totalCount.set(count);
    }
}
