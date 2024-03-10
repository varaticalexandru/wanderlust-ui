import { TestBed } from '@angular/core/testing';

import { AirportCityMappingService } from './airport-city-mapping.service';

describe('AirportCityMappingService', () => {
  let service: AirportCityMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirportCityMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
