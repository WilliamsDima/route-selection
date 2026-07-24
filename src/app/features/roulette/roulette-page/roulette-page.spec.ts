import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { RoulettePage } from './roulette-page';

describe('RoulettePage', () => {
  let component: RoulettePage;
  let fixture: ComponentFixture<RoulettePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoulettePage],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(RoulettePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
