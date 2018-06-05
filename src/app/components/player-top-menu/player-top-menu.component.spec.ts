import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTopMenuComponent } from './player-top-menu.component';

describe('PlayerTopMenuComponent', () => {
  let component: PlayerTopMenuComponent;
  let fixture: ComponentFixture<PlayerTopMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerTopMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerTopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
