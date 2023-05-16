import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrotherComponent } from './add-brother.component';

describe('AddBrotherComponent', () => {
  let component: AddBrotherComponent;
  let fixture: ComponentFixture<AddBrotherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBrotherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBrotherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
