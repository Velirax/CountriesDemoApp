import { TestBed } from '@angular/core/testing';

import { FetchPicturesService } from './fetch-pictures.service';

describe('FetchPicturesService', () => {
  let service: FetchPicturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchPicturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
