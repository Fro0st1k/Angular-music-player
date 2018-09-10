import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { DataService } from '../../../services/data.service';
import { ShareService } from '../../../services/share.service';
import { ISongInfo } from '../../../entities/interfaces.ISongInfo';
import { tap, switchMap, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-bar-song-info',
  templateUrl: './player-bar-song-info.component.html',
  styleUrls: ['./player-bar-song-info.component.scss']
})

export class PlayerBarSongInfoComponent implements OnInit, OnDestroy {
  private playingSong: ISongInfo;
  private songList: ISongInfo[];
  private dataSub: Subscription;

  constructor(
    private shareService: ShareService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataSub = this.dataService
    .getSongList()
    .pipe(
      filter(data => data !== undefined),
      tap(data => this.songList = data),
      switchMap(data => this.shareService.nowPlayingSong$))
    .subscribe(songInfo => this.playingSong = this.songList[songInfo.songId]);

  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }
}
