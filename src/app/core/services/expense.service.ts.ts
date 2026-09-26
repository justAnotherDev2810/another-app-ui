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

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private readonly http = inject(HttpClient);

    // Get all categories
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(API_ENDPOINTS.CATEGORIES.BASE);
    }

    // Create new expense
    createExpense(payload: ExpenseRequestDto): Observable<ExpenseResponseDto> {
        return this.http.post<ExpenseResponseDto>(API_ENDPOINTS.EXPENSES.BASE, payload);
    }

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



    getAllExpenses(): Observable<any> {

        return this.http.get<any>(API_ENDPOINTS.EXPENSES.BASE);
    }

    // get total expense
    getExpenseTotal(filters: ExpenseFilterParams): Observable<ExpenseTotalResponse> {
        let params = new HttpParams();
        if (filters.categoryId) params = params.set('categoryId', filters.categoryId);
        if (filters.startDate) params = params.set('startDate', filters.startDate);
        if (filters.endDate) params = params.set('endDate', filters.endDate);

        return this.http.get<ExpenseTotalResponse>(API_ENDPOINTS.EXPENSES.TOTAL, { params });
    }
}
