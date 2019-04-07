import { TestBed } from '@angular/core/testing';

import { TokenStore } from './token-store.service';

describe('TokenStore', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenStore = TestBed.get(TokenStore);
    expect(service).toBeTruthy();
  });
});
