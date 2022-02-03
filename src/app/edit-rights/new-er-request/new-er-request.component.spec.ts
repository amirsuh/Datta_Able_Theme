import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewErRequestComponent } from './new-er-request.component';

describe('NewErRequestComponent', () => {
  let component: NewErRequestComponent;
  let fixture: ComponentFixture<NewErRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewErRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewErRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
