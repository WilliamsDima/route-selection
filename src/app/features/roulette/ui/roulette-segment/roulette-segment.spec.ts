import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouletteSegment } from './roulette-segment';

describe('RouletteSegment', () => {
  let component: RouletteSegment;
  let fixture: ComponentFixture<RouletteSegment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouletteSegment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouletteSegment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
