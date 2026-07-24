import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { RouteService } from './route';

describe('Route', () => {
  let service: RouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(RouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
