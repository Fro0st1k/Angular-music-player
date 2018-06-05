import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSongListComponent } from './player-song-list.component';

describe('PlayerSongListComponent', () => {
  let component: PlayerSongListComponent;
  let fixture: ComponentFixture<PlayerSongListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerSongListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSongListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
