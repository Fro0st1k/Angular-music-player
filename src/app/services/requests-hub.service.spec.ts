import { TestBed, inject } from '@angular/core/testing';

import { RequestsHubService } from './requests-hub.service';

describe('RequestsHubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestsHubService]
    });
  });

  it('should be created', inject([RequestsHubService], (service: RequestsHubService) => {
    expect(service).toBeTruthy();
  }));
});
