import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageAddComponent } from './voyage-add.component';

describe('VoyageAddComponent', () => {
  let component: VoyageAddComponent;
  let fixture: ComponentFixture<VoyageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoyageAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoyageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
