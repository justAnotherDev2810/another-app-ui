import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../../../shared/shared-material.module';

@Component({
  selector: 'app-expense-total-summary',
  standalone: true,
  imports: [CommonModule, SharedMaterialModule],
  templateUrl: './expense-total-summary.html'
})
export class ExpenseTotalSummary {
  @Input() totalAmount: number = 0;
  @Input() totalCount: number = 0;
}
