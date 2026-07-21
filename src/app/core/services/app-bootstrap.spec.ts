import { TestBed } from '@angular/core/testing';

import { AppBootstrap } from './app-bootstrap';

describe('AppBootstrap', () => {
  let service: AppBootstrap;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppBootstrap);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
