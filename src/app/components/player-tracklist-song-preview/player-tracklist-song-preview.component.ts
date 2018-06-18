import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-tracklist-song-preview',
  templateUrl: './player-tracklist-song-preview.component.html',
  styleUrls: ['./player-tracklist-song-preview.component.scss']
})

export class PlayerTracklistSongPreviewComponent {
  @Input() currentSong;
}
