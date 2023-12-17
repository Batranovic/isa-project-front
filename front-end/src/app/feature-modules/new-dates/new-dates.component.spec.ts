import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDatesComponent } from './new-dates.component';

describe('NewDatesComponent', () => {
  let component: NewDatesComponent;
  let fixture: ComponentFixture<NewDatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDatesComponent]
    });
    fixture = TestBed.createComponent(NewDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
