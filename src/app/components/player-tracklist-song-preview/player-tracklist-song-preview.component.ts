import { Component, Input, OnChanges } from '@angular/core';
import { BackgroundChangerService } from '../../services/background-changer.service';

@Component({
  selector: 'app-player-tracklist-song-preview',
  templateUrl: './player-tracklist-song-preview.component.html',
  styleUrls: ['./player-tracklist-song-preview.component.scss']
})

export class PlayerTracklistSongPreviewComponent implements OnChanges {
  @Input() currentSong;

  constructor(private backgroundChangerService: BackgroundChangerService) {}

  ngOnChanges() {
    setTimeout(() => {
      this.backgroundChangerService.setNewImage(document.querySelector('.img'));
    }, 200);
  }
}
