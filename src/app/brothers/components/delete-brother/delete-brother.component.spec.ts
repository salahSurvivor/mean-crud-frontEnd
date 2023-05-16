import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBrotherComponent } from './delete-brother.component';

describe('DeleteBrotherComponent', () => {
  let component: DeleteBrotherComponent;
  let fixture: ComponentFixture<DeleteBrotherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBrotherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBrotherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
