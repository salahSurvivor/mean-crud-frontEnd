import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfTrainingComponent } from './pdf-training.component';

describe('PdfTrainingComponent', () => {
  let component: PdfTrainingComponent;
  let fixture: ComponentFixture<PdfTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
