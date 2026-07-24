import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { AppBootstrap } from './app-bootstrap';

describe('AppBootstrap', () => {
  let service: AppBootstrap;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(AppBootstrap);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
