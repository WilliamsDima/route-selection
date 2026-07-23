import { TestBed } from '@angular/core/testing';

import { RouteFacade } from './route-facade';

describe('RouteFacade', () => {
  let service: RouteFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
