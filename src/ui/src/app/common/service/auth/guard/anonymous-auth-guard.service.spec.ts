import { TestBed } from '@angular/core/testing';

import { AnonymousAuthGuard } from './anonymous-auth-guard.service';

describe('AnonymousAuthGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnonymousAuthGuard = TestBed.get(AnonymousAuthGuard);
    expect(service).toBeTruthy();
  });
});
