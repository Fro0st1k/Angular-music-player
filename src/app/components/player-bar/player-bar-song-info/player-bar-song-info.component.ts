import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { DataService } from '../../../services/data.service';
import { ShareService } from '../../../services/share.service';
import { ISongInfo } from '../../../entities/interfaces.ISongInfo';

@Component({
  selector: 'app-player-bar-song-info',
  templateUrl: './player-bar-song-info.component.html',
  styleUrls: ['./player-bar-song-info.component.scss']
})

export class PlayerBarSongInfoComponent implements OnInit, OnDestroy {
  private playingSong: ISongInfo;
  private songList: ISongInfo[];

  constructor(
    private shareService: ShareService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getSongList()
      .subscribe(data => {
        if (data) {
          this.songList = data;
          this.playingSong = this.songList[this.shareService.getCurrentSongId()];
        }
      });

    this.shareService.notifyChangeId.subscribe(() => this.playingSong = this.songList[this.shareService.getCurrentSongId()]);
  }

  ngOnDestroy() {

  }
}
