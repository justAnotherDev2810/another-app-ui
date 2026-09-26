import { TestBed } from '@angular/core/testing';

import { ExpenseServiceTs } from './expense.service.ts';

describe('ExpenseServiceTs', () => {
  let service: ExpenseServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
