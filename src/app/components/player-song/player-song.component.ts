import { Component, OnInit, Input } from '@angular/core';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-player-song',
  templateUrl: './player-song.component.html',
  styleUrls: ['./player-song.component.scss']
})

export class PlayerSongComponent implements OnInit {
  @Input() song;
  private isPlaying = false;

  constructor(private shareService: ShareService) {}

  ngOnInit() {
    this.shareService.nowPlayingSong$
      .subscribe(songInfo => this.selectPlayingSong(songInfo.isPlaying, songInfo.songId));
  }

  playSelectedSong(selectedSongId: number): void {
    if (!this.isPlaying) {
      this.shareService.setNowPlayingSongInfo({ isPlaying: false, songId: selectedSongId });
    } else {
      this.shareService.setNowPlayingSongInfo({ isPlaying: true, songId: selectedSongId });
    }
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
