import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerBarSongInfoComponent } from './player-bar-song-info.component';

describe('PlayerBarSongInfoComponent', () => {
  let component: PlayerBarSongInfoComponent;
  let fixture: ComponentFixture<PlayerBarSongInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerBarSongInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBarSongInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
