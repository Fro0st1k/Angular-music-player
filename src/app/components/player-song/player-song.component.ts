import { Component, OnInit, Input } from '@angular/core';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-player-song',
  templateUrl: './player-song.component.html',
  styleUrls: ['./player-song.component.scss']
})

export class PlayerSongComponent implements OnInit {
  private isPlaying = false;
  @Input() song;

  constructor(private shareService: ShareService) {}

  ngOnInit() {
    this.shareService.notifyChangeId
      .subscribe(id => {
        if (id === this.song.id) {
          this.changeStatus(true);
        } else {
          this.changeStatus(false);
        }
    });

    if (this.song.id === this.shareService.currentSongId && this.shareService.isPlaying) {
      this.changeStatus(true);
    }
  }

  changeStatus(status) {
    this.isPlaying = status;
  }

  playSong(id) {
    this.shareService.playSong(id);
  }
}
