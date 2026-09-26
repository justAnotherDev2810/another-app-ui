import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTotalSummary } from './expense-total-summary';

describe('ExpenseTotalSummary', () => {
  let component: ExpenseTotalSummary;
  let fixture: ComponentFixture<ExpenseTotalSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseTotalSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseTotalSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
