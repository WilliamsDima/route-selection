import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouletteHub } from './roulette-hub';

describe('RouletteHub', () => {
  let component: RouletteHub;
  let fixture: ComponentFixture<RouletteHub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouletteHub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouletteHub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
