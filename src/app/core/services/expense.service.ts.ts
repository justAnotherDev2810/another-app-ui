import { Injectable, inject, signal, computed } from '@angular/core';
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

    // Primary Reactive State Signals
    private readonly _categories = signal<Category[]>([]);
    private readonly _expenses = signal<ExpenseResponseDto[]>([]);
    private readonly _loading = signal<boolean>(false);
    private readonly _totalAmount = signal<number>(0);
    private readonly _totalCount = signal<number>(0);

    // Public Readonly Selectors
    readonly categories = this._categories.asReadonly();
    readonly expenses = this._expenses.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly totalAmount = this._totalAmount.asReadonly();
    readonly totalCount = this._totalCount.asReadonly();

    constructor() {
        this.loadCategories();
    }

    // Load all categories
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

    // Load expenses
    loadExpenses(filters?: ExpenseFilterParams): void {
        this._loading.set(true);
        this.http.get<any>(API_ENDPOINTS.EXPENSES.BASE).subscribe({
            next: (res) => {
                this._expenses.set(res.content || []);
                this._loading.set(false);
                this.notification.success("Successfully fetched expenses list.")
            },
            error: () => {
                this._loading.set(false);
                this.notification.error('Failed to load expenses list.');
            }
        });
    }

    // Load total expense summary
    loadExpenseTotal(filters: ExpenseFilterParams): void {
        let params = new HttpParams();
        if (filters.categoryId) params = params.set('categoryId', filters.categoryId);
        if (filters.startDate) params = params.set('startDate', filters.startDate);
        if (filters.endDate) params = params.set('endDate', filters.endDate);

        this.http.get<ExpenseTotalResponse>(API_ENDPOINTS.EXPENSES.TOTAL, { params }).subscribe({
            next: (res) => {
                this._totalAmount.set(res.total);
                this._totalCount.set(res.count);
                this.notification.success("Successfully fetched expense totals.")
            },
            error: () => {
                this.notification.error('Failed to fetch expense totals.');
            }
        });
    }

    // Create new expense
    createExpense(payload: ExpenseRequestDto): Observable<ExpenseResponseDto> {
        return this.http.post<ExpenseResponseDto>(API_ENDPOINTS.EXPENSES.BASE, payload);
    }

    // Legacy method for backward compatibility
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(API_ENDPOINTS.CATEGORIES.BASE);
    }

    // Legacy method for backward compatibility
    getExpenses(filters: ExpenseFilterParams): Observable<ExpenseResponseDto> {
        let params = new HttpParams();
        if (filters.page !== undefined) params = params.set('page', filters.page);
        if (filters.size !== undefined) params = params.set('size', filters.size);
        if (filters.sort) params = params.set('sort', filters.sort);
        if (filters.categoryId) params = params.set('categoryId', filters.categoryId);
        if (filters.startDate) params = params.set('startDate', filters.startDate);
        if (filters.endDate) params = params.set('endDate', filters.endDate);

        return this.http.get<ExpenseResponseDto>(API_ENDPOINTS.EXPENSES.BASE, { params });
    }

    // Legacy method for backward compatibility
    getAllExpenses(): Observable<any> {
        return this.http.get<any>(API_ENDPOINTS.EXPENSES.BASE);
    }

    // Legacy method for backward compatibility
    getExpenseTotal(filters: ExpenseFilterParams): Observable<ExpenseTotalResponse> {
        let params = new HttpParams();
        if (filters.categoryId) params = params.set('categoryId', filters.categoryId);
        if (filters.startDate) params = params.set('startDate', filters.startDate);
        if (filters.endDate) params = params.set('endDate', filters.endDate);

        return this.http.get<ExpenseTotalResponse>(API_ENDPOINTS.EXPENSES.TOTAL, { params });
    }
}
