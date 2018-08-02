import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BackgroundChangerService } from '../../services/background-changer.service';

@Component({
  selector: 'app-player-tracklist-song-preview',
  templateUrl: './player-tracklist-song-preview.component.html',
  styleUrls: ['./player-tracklist-song-preview.component.scss']
})

export class PlayerTracklistSongPreviewComponent implements OnChanges, OnInit {
  @Input() currentSong;
  private backgroundEl: HTMLElement = document.querySelector('.content-bg');

  constructor(private backgroundChangerService: BackgroundChangerService) {}

  ngOnInit() {
    this.backgroundChangerService.renderBackground(document.querySelector('.img'), this.backgroundEl);
  }

  ngOnChanges() {
    this.backgroundChangerService.renderBackground(document.querySelector('.img'), this.backgroundEl);
  }

}
