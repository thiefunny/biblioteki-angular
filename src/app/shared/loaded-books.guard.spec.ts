import { TestBed } from '@angular/core/testing';

import { LoadedBooksGuard } from './loaded-books.guard';

describe('LoadedBooksGuard', () => {
  let guard: LoadedBooksGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoadedBooksGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
