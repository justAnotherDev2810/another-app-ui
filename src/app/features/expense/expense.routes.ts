import { Routes } from '@angular/router';
// import { ExpenseComponent } from './expense.component';

export const EXPENSE_ROUTES: Routes = [
    {
        path: '',
        // component: ExpenseComponent,
        children: [
            //   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            //   {
            //     path: 'dashboard',
            //     loadComponent: () => import('./pages/expense-dashboard/expense-dashboard.component').then(m => m.ExpenseDashboardComponent)
            //   },
            //   {
            //     path: 'transactions',
            //     loadComponent: () => import('./pages/expense-transactions/expense-transactions.component').then(m => m.ExpenseTransactionsComponent)
            //   },
            //   {
            //     path: 'analytics',
            //     loadComponent: () => import('./pages/expense-analytics/expense-analytics.component').then(m => m.ExpenseAnalyticsComponent)
            //   }
        ]
    }
];