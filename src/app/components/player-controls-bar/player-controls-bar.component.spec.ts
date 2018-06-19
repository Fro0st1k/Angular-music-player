import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerControlsBarComponent } from './player-controls-bar.component';

describe('PlayerProgressBarComponent', () => {
  let component: PlayerControlsBarComponent;
  let fixture: ComponentFixture<PlayerControlsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerControlsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerControlsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
