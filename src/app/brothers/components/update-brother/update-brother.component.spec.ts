import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBrotherComponent } from './update-brother.component';

describe('UpdateBrotherComponent', () => {
  let component: UpdateBrotherComponent;
  let fixture: ComponentFixture<UpdateBrotherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBrotherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBrotherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
