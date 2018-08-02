import { TestBed, inject } from '@angular/core/testing';

import { BackgroundChangerService } from './background-changer.service';

describe('BackgroundChangerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackgroundChangerService]
    });
  });

  it('should be created', inject([BackgroundChangerService], (service: BackgroundChangerService) => {
    expect(service).toBeTruthy();
  }));
});
