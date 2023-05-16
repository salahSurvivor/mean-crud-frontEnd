import { TestBed } from '@angular/core/testing';

import { ToggleModalService } from './toggle-modal.service';

describe('ToggleModalService', () => {
  let service: ToggleModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
