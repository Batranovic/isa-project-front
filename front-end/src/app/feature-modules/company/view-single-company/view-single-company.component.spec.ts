import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleCompanyComponent } from './view-single-company.component';

describe('ViewSingleCompanyComponent', () => {
  let component: ViewSingleCompanyComponent;
  let fixture: ComponentFixture<ViewSingleCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSingleCompanyComponent]
    });
    fixture = TestBed.createComponent(ViewSingleCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
