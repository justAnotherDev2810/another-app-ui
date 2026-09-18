import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'users',
                loadComponent: () => import('./features/users/users.component').then(m => m.UsersComponent)
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.Dashboard)
            },
            {
                path: 'profile',
                loadComponent: () => import('./features/profile/profile.component').then(m => m.Profile)
            },
            {
                path: 'expense',
                loadComponent: () => import('./features/expense/expense.component').then(m => m.Expense)
            },
            {
                path: 'todo',
                loadComponent: () => import('./features/todo/todo.component').then(m => m.Todo)
            },
            { path: '**', redirectTo: 'dashboard' }
        ]
    }
];