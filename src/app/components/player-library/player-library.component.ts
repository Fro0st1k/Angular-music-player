import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { ShareService } from './../../services/share.service';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-player-library',
  templateUrl: './player-library.component.html',
  styleUrls: ['./player-library.component.scss']
})

export class PlayerLibraryComponent implements OnInit, OnDestroy {
  @Output() songList;
  @Output() currentSong;

  private currentSongId = this.shareService.currentSongId;
  private subscribes = [];
  private dataSub;
  private changeIdSub;

  constructor(
    private shareService: ShareService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataSub = this.dataService.songListObs
      .subscribe(data => {
        if (data) {
          this.songList = data;
          this.currentSong = this.songList[this.currentSongId];
        }
      });

    this.changeIdSub = this.shareService.notifyChangeId
      .subscribe(id => {
        this.currentSongId = id;
        this.currentSong = this.songList[id];
      });

    this.subscribes.push(this.changeIdSub, this.dataSub);
  }

  ngOnDestroy() {
    this.subscribes.forEach(sub => {
      sub.unsubscribe();
    });
  }
}

interface ISongInfo {
  id;
  name;
  artist;
  albumName;
  cover;
  src;
  duration;
}

interface ISongList {
  songList: ISongInfo[];
}
