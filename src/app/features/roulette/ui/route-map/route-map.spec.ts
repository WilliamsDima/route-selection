import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteMap } from './route-map';

describe('RouteMap', () => {
  let component: RouteMap;
  let fixture: ComponentFixture<RouteMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
