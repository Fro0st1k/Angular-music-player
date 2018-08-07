import { Component, OnInit, Input } from '@angular/core';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-player-song',
  templateUrl: './player-song.component.html',
  styleUrls: ['./player-song.component.scss']
})

export class PlayerSongComponent implements OnInit {
  private isPlaying: boolean;
  @Input() song;

  constructor(private shareService: ShareService) { }

  ngOnInit() {
    this.shareService.notifyChangeId
      .subscribe(id => {
        if (this.song.id === id) {
          this.setSongStatus(this.shareService.getSongStatus());
        } else {
          this.setSongStatus(false);
        }
      });

    if (this.song.id === this.shareService.getCurrentSongId() && this.shareService.getSongStatus()) {
      this.setSongStatus(true);
    }
  }

  playCurrentSong(id) {
    this.shareService.playCurrentSong(id);
  }

  setSongStatus(status: boolean) {
    this.isPlaying = status;
  }
}
