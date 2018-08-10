import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBarControlsComponent } from './player-bar-controls.component';

describe('PlayerBarControlsComponent', () => {
  let component: PlayerBarControlsComponent;
  let fixture: ComponentFixture<PlayerBarControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerBarControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBarControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
