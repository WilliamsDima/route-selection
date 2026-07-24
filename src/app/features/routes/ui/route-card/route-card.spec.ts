import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteCard } from './route-card';
import { BikeRoute } from '../../../../core/models/bike-route';

describe('RouteCard', () => {
  let component: RouteCard;
  let fixture: ComponentFixture<RouteCard>;

  const route: BikeRoute = {
    id: 1,
    name: 'Тестовый маршрут',
    gpxFile: 'routes/test.gpx',
    distKm: 12,
    type: 'short',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('route', route);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
