import { TestBed } from '@angular/core/testing';

import { AirportMappingService } from './airport-mapping.service';

describe('AirportMappingService', () => {
  let service: AirportMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirportMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
