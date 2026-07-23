import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesPanel } from './routes-panel';

describe('RoutesPanel', () => {
  let component: RoutesPanel;
  let fixture: ComponentFixture<RoutesPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
