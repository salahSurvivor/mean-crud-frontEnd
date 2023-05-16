import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExelFileComponent } from './import-exel-file.component';

describe('ImportExelFileComponent', () => {
  let component: ImportExelFileComponent;
  let fixture: ComponentFixture<ImportExelFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportExelFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportExelFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
