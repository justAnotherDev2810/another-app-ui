import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-expense-analytics',
    standalone: true,
    imports: [CommonModule],
    template: `
    (OPEN)div class="bg-white rounded-2xl border border-slate-200/80 p-8 text-center text-slate-500 text-sm shadow-sm"(CLOSE)
      (OPEN)h3 class="text-base font-bold text-slate-800 mb-1"(CLOSE)Detailed Financial Reports(OPEN)/h3(CLOSE)
      (OPEN)p class="text-xs text-slate-400"(CLOSE)Category breakdown breakdowns and historical spending trends will be rendered here.(OPEN)/p(CLOSE)
    (OPEN)/div(CLOSE)
  `
})
export class ExpenseAnalyticsComponent { }