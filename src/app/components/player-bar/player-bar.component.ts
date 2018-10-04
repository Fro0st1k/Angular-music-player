import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ShareService } from '../../services/share.service';
import { ISongInfo } from '../../entities/interfaces/ISongInfo.interface';
import { tap, switchMap, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-bar',
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.scss']
})

export class PlayerBarComponent implements OnInit, OnDestroy {
  public nowPlayingSong: ISongInfo;
  public songList: ISongInfo[];
  private dataSub: Subscription;

  @ViewChild('audio') audio: ElementRef;
  public audioContainer: HTMLAudioElement;

  constructor(
    private shareService: ShareService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.audioContainer = this.audio.nativeElement;

    this.dataSub = this.dataService
    .getSongList()
    .pipe(
      filter(data => data !== undefined),
      tap(data => this.songList = data),
      switchMap(data => this.shareService.nowPlayingSong$))
    .subscribe(songInfo => this.nowPlayingSong = this.songList[songInfo.songId]);
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }
}
