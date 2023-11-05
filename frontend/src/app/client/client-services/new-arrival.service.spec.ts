import { TestBed } from '@angular/core/testing';

import { NewArrivalService } from './new-arrival.service';

describe('NewArrivalService', () => {
  let service: NewArrivalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewArrivalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
