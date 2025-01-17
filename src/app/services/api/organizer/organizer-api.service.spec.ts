import { TestBed } from '@angular/core/testing';

import { OrganizerApiService } from './organizer-api.service';

describe('OrganizerApiService', () => {
  let service: OrganizerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
