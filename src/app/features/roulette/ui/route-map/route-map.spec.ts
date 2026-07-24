import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { RouteMap } from './route-map';

describe('RouteMap', () => {
  let component: RouteMap;
  let fixture: ComponentFixture<RouteMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteMap],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(RouteMap);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('gpxFile', 'routes/test.gpx');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
