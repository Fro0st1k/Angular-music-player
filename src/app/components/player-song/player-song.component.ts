import { Component, OnInit, Input } from '@angular/core';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-player-song',
  templateUrl: './player-song.component.html',
  styleUrls: ['./player-song.component.scss']
})

export class PlayerSongComponent implements OnInit {
  @Input() song;
  public isPlaying = false;

  constructor(private shareService: ShareService) {}

  ngOnInit() {
    this.shareService.nowPlayingSong$
      .subscribe(songInfo => this.selectPlayingSong(songInfo.isPlaying, songInfo.songId));
  }

  playSelectedSong(selectedSongId: number): void {
    this.shareService.setNowPlayingSongInfo({ isPlaying: this.isPlaying, songId: selectedSongId });
    this.shareService.playSelectedSong(selectedSongId);
  }

  selectPlayingSong(selectedSongIsPlaying: boolean, selectedSongId: number): void {
    if (selectedSongId === this.song.id && selectedSongIsPlaying) {
      this.isPlaying = true;
    } else {
      this.isPlaying = false;
    }
  }
}
