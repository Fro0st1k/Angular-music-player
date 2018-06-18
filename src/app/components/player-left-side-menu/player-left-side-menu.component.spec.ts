import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerLeftSideMenuComponent } from './player-left-side-menu.component';

describe('PlayerLeftSideMenuComponent', () => {
  let component: PlayerLeftSideMenuComponent;
  let fixture: ComponentFixture<PlayerLeftSideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerLeftSideMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerLeftSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
