import { TestBed } from '@angular/core/testing';

import { GeocacheService } from './geocache.service';

describe('GeocacheService', () => {
  let service: GeocacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeocacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
