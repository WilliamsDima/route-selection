import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { RouletteWheel } from './roulette-wheel';

describe('RouletteWheel', () => {
  let component: RouletteWheel;
  let fixture: ComponentFixture<RouletteWheel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouletteWheel],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouletteWheel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
