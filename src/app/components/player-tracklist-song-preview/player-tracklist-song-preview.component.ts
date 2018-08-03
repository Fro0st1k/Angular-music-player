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
    const image: HTMLImageElement = document.querySelector('.img');
    image.onload = () => this.backgroundChangerService.setNewImage(image);
  }
}
