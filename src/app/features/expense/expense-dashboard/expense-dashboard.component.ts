import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-expense-dashboard',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="bg-white rounded-2xl border border-slate-200/80 p-8 text-center text-slate-500 text-sm shadow-sm">
      <h3 class="text-base font-bold text-slate-800 mb-1">Expense Analytics Dashboard</h3>
      <p class="text-xs text-slate-400">Summary charts, balance indicators, and budget progress widgets will be rendered here.</p>
    </div>
  `
})
export class ExpenseDashboardComponent { }