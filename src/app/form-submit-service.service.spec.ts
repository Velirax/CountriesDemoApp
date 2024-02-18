import { TestBed } from '@angular/core/testing';

import { FormSubmitServiceService } from './form-submit-service.service';

describe('FormSubmitServiceService', () => {
  let service: FormSubmitServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSubmitServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
