import { TestBed } from '@angular/core/testing';

import { FinancialportalService } from './financialportal.service';

describe('FinancialportalService', () => {
  let service: FinancialportalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialportalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
