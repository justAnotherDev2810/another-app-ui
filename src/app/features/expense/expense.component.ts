import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { ExpenseAnalyticsComponent } from './expense-analytics/expense-analytics.component';
import { ExpenseDashboardComponent } from './expense-dashboard/expense-dashboard.component';
import { ExpenseTransactionsComponent } from './expense-transactions/expense-transactions.component';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [
    CommonModule,
    SharedMaterialModule,
    ExpenseDashboardComponent,
    ExpenseTransactionsComponent,
    ExpenseAnalyticsComponent
  ],
  templateUrl: './expense.component.html'
})
export class Expense {
  activeTab: 'dashboard' | 'transactions' | 'analytics' = 'transactions';

  setActiveTab(tab: 'dashboard' | 'transactions' | 'analytics'): void {
    this.activeTab = tab;
  }
}