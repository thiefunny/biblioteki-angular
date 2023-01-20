import { TestBed } from '@angular/core/testing';

import { EditResolverResolver } from './edit-resolver.resolver';

describe('EditResolverResolver', () => {
  let resolver: EditResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EditResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
