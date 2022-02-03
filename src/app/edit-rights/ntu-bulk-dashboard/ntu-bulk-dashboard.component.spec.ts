import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NtuBulkDashboardComponent } from './ntu-bulk-dashboard.component';

describe('NtuBulkDashboardComponent', () => {
  let component: NtuBulkDashboardComponent;
  let fixture: ComponentFixture<NtuBulkDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NtuBulkDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NtuBulkDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
