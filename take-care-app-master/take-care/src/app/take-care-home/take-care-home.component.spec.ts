import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeCareHomeComponent } from './take-care-home.component';

describe('TakeCareHomeComponent', () => {
  let component: TakeCareHomeComponent;
  let fixture: ComponentFixture<TakeCareHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeCareHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeCareHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
