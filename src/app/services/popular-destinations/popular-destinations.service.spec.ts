import { TestBed } from '@angular/core/testing';

import { PopularDestinationsService } from './popular-destinations.service';

describe('PopularDestinationsService', () => {
  let service: PopularDestinationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopularDestinationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
