import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { RouteFacade } from './route-facade';

describe('RouteFacade', () => {
  let service: RouteFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(RouteFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
