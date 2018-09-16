import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { ShareService } from '../../services/share.service';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

import { ISongInfo } from '../../entities/ISongInfo.interfaces';
import { filter, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-player-library',
  templateUrl: './player-library.component.html',
  styleUrls: ['./player-library.component.scss']
})

export class PlayerLibraryComponent implements OnInit, OnDestroy {
  @Output() songList: ISongInfo[];
  @Output() currentSong: ISongInfo;
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
        switchMap(data => this.shareService.nowPlayingSong$)
      )
      .subscribe(songInfo => {
        this.currentSong = this.songList[songInfo.songId];
      });
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }
}

