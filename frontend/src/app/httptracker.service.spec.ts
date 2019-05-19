import { TestBed } from '@angular/core/testing';

import { HttptrackerService } from './httptracker.service';

describe('HttptrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttptrackerService = TestBed.get(HttptrackerService);
    expect(service).toBeTruthy();
  });
});
