import { TestBed } from '@angular/core/testing';

import { NewsLatterService } from './news-latter.service';

describe('NewsLatterService', () => {
  let service: NewsLatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsLatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
