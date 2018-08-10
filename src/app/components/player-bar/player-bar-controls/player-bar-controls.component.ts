import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';

import { ChangeProgressBarService } from '../../../services/change-progress-bar.service';
import { ShareService } from '../../../services/share.service';
import { DataService } from '../../../services/data.service';

import { ISongInfo } from './../../../entities/interfaces.ISongInfo';

@Component({
  selector: 'app-player-bar-controls',
  templateUrl: './player-bar-controls.component.html',
  styleUrls: ['./player-bar-controls.component.scss']
})

export class PlayerBarControlsComponent implements OnInit, OnDestroy {
  private refreshInterval: any;
  // SongTime
  @ViewChild('progressBar') progress: ElementRef;
  @ViewChild('progressBarStatus') progressStatus: ElementRef;
  private progressBar: HTMLElement;
  private progressBarStatus: HTMLElement;
  // Play
  @Input() audioContainer: HTMLAudioElement;
  private nowPlayingSongId: number;
  private currentSongTime = 0;
  public songList: ISongInfo[];
  public playingSong: ISongInfo;
  private isPlaying: boolean;
  private isShufflePlay: boolean;
  private isRepeatPlay: boolean;

  constructor(
    private shareService: ShareService,
    private dataService: DataService,
    private changeProgressBar: ChangeProgressBarService
  ) { }

  ngOnInit(): void {
    this.dataService.getSongList()
      .subscribe(data => {
        if (data) {
          this.songList = data;
          this.setSongInfo();
        }
      });

    this.shareService.notifyPlaySong
      .subscribe(id => {
        this.playSelectedSong(id);
      });

    this.progressBar = this.progress.nativeElement;
    this.progressBarStatus = this.progressStatus.nativeElement;
    this.isPlaying = this.shareService.getSongStatus();
  }

  playSong(): void {
    if (this.shareService.getSongStatus()) {
      this.pauseSong();
      return;
    }
    this.shareService.changeSongStatus(true);
    this.isPlaying = this.shareService.getSongStatus();
    this.shareService.sendNewSongId(this.nowPlayingSongId);

    setTimeout(() => {
      this.audioContainer.play();
    });

    this.refreshInterval = setInterval(() => {
      this.changeSongBarStatusPerSecond();
      this.refreshCurrentSongTime();
    }, 1000);
  }

  pauseSong(): void {
    clearInterval(this.refreshInterval);
    this.audioContainer.pause();
    this.shareService.changeSongStatus(false);
    this.shareService.sendNewSongId(this.nowPlayingSongId);
    this.isPlaying = this.shareService.getSongStatus();
  }

  setSongInfo(id: number = 0): void { // in shareService ?
    this.nowPlayingSongId = id;
    this.playingSong = this.songList[id];
    this.audioContainer.src = this.playingSong.src;
    this.playingSong.duration = this.songList[id].duration;
  }

  playNextOrPreviousSong(isNext: boolean): void {
    this.pauseSong();
    this.changeProgressBar.moveProgressBarStatus(this.progressBarStatus, 0);

    if (this.isRepeatPlay) {
      this.pauseSong();
      this.setCurrentSongTime(0);
      this.playSong();
      return;
    }

    if (this.isShufflePlay) {
      const randomNumber = this.getRandomNumber(this.songList.length - 1, 0);
      this.nowPlayingSongId = this.songList[randomNumber].id;
      this.setSongInfo(this.nowPlayingSongId);
      this.playSong();
      return;
    }

    if (isNext) {
      this.nowPlayingSongId = ++this.nowPlayingSongId;
      this.setSongInfo(this.nowPlayingSongId);
    } else {
      this.nowPlayingSongId = --this.nowPlayingSongId;
      this.setSongInfo(this.nowPlayingSongId);
    }

    this.playSong();
  }

  toggleRepeatSong() {
    this.isRepeatPlay = !this.isRepeatPlay;
  }

  toggleShufflePlay(): void {
    this.isShufflePlay = !this.isShufflePlay;
  }

  getRandomNumber(max: number, min: number): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  playSelectedSong(selectedSongId: number): void {
    if (this.shareService.getSongStatus() && selectedSongId === this.shareService.getCurrentSongId()) {
      this.pauseSong();
      return;
    }

    if (selectedSongId !== this.shareService.getCurrentSongId()) {
      this.changeProgressBar.moveProgressBarStatus(this.progressBarStatus, 0);
    }

    this.pauseSong();
    this.setSongInfo(selectedSongId);
    this.playSong();
  }

  getCurrentSongDuration(): number {
    return this.audioContainer.duration;
  }

  setCurrentSongTime(time: number): void {
    this.currentSongTime = time;
    this.audioContainer.currentTime = time;
  }

  getCurrentSongTime(): number {
    return this.audioContainer.currentTime;
  }

  refreshCurrentSongTime(): void {
    this.currentSongTime = this.getCurrentSongTime();
  }

  handChangeCurrentSongTime(event: MouseEvent): void {
    const shift = this.changeProgressBar.changeProgressBarStatus(this.progressBar, this.progressBarStatus, event);
    this.setCurrentSongTime(this.getCurrentSongDuration() * shift / 100);
  }

  changeSongBarStatusPerSecond(): void {
    if (this.audioContainer.ended) {
      this.playNextOrPreviousSong(true);
      return;
    }
    const dislocationPerSecond = 100 / this.getCurrentSongDuration();
    this.changeProgressBar.changeProgressBarStatusPerSecond(this.progressBarStatus, dislocationPerSecond);
  }

  ngOnDestroy() {

  }

}
