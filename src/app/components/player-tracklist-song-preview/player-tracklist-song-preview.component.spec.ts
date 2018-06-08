import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTracklistSongPreviewComponent } from './player-tracklist-song-preview.component';

describe('PlayerTracklistSongPreviewComponent', () => {
  let component: PlayerTracklistSongPreviewComponent;
  let fixture: ComponentFixture<PlayerTracklistSongPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerTracklistSongPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerTracklistSongPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
