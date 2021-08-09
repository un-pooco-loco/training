import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsAppComponent } from './recommendations-app.component';

describe('RecommendationsAppComponent', () => {
  let component: RecommendationsAppComponent;
  let fixture: ComponentFixture<RecommendationsAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendationsAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
