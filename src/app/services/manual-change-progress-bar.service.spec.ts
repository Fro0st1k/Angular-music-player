import { TestBed, inject } from '@angular/core/testing';

import { ManualChangeProgressBarService } from './manual-change-progress-bar.service';

describe('ManualChangeProgressBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManualChangeProgressBarService]
    });
  });

  it('should be created', inject([ManualChangeProgressBarService], (service: ManualChangeProgressBarService) => {
    expect(service).toBeTruthy();
  }));
});
