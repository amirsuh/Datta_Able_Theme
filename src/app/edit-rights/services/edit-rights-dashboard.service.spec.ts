import { TestBed } from '@angular/core/testing';

import { EditRightsDashboardService } from './edit-rights-dashboard.service';

describe('EditRightsDashboardService', () => {
  let service: EditRightsDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditRightsDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
