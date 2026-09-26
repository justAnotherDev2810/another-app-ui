export interface Category {
    id: number;
    name: string;
}

export interface ExpenseRequestDto {
    userId: number;
    categoryId: number;
    amount: number;
    description?: string;
    expenseDate: string; // YYYY-MM-DD
}

export interface ExpenseResponseDto {
    id: number;
    userId: number;
    categoryId: number;
    categoryName: string;
    amount: number;
    description?: string;
    expenseDate: string;
}

export interface ExpenseTotalResponse {
    total: number;
    count: number;
}

export interface ExpenseFilterParams {
    categoryId?: number;
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
    sort?: string;
}