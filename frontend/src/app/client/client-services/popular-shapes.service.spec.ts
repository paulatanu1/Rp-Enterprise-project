import { TestBed } from '@angular/core/testing';

import { PopularShapesService } from './popular-shapes.service';

describe('PopularShapesService', () => {
  let service: PopularShapesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopularShapesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
