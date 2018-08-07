import { TestBed, inject } from '@angular/core/testing';

import { ChangeProgressBarService } from './change-progress-bar.service';

describe('ManualChangeProgressBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangeProgressBarService]
    });
  });

  it('should be created', inject([ChangeProgressBarService], (service: ChangeProgressBarService) => {
    expect(service).toBeTruthy();
  }));
});
