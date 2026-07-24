import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouletteSegment } from './roulette-segment';
import { WheelSegment } from '../wheel-segment.model';

describe('RouletteSegment', () => {
  let component: RouletteSegment;
  let fixture: ComponentFixture<RouletteSegment>;

  const segment: WheelSegment = {
    index: 0,
    path: 'M 50 50 L 96 50 A 46 46 0 0 1 50 96 Z',
    color: 'hsl(0 65% 55%)',
    textColor: '#ffffff',
    label: 'Тестовый',
    labelX: 50,
    labelY: 50,
    labelRotation: 0,
    mid: 45,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouletteSegment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouletteSegment);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('segment', segment);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
