import { TestBed } from '@angular/core/testing';

import { SearchDestinationService } from './search-destination.service';

describe('SearchDestinationService', () => {
  let service: SearchDestinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchDestinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
