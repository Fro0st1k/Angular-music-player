import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input, OnChanges, SimpleChange } from '@angular/core';
import { ChangeProgressBarService } from '../../../services/change-progress-bar.service';
import { ShareService } from '../../../services/share.service';

import { ISongInfo } from '../../../entities/ISongInfo.interfaces';

@Component({
  selector: 'app-player-bar-controls',
  templateUrl: './player-bar-controls.component.html',
  styleUrls: ['./player-bar-controls.component.scss']
})

export class PlayerBarControlsComponent implements OnInit, OnChanges, OnDestroy {
  private refreshInterval: any;
  // SongTime
  @ViewChild('progressBar') progress: ElementRef;
  @ViewChild('progressBarStatus') progressStatus: ElementRef;
  private progressBar: HTMLElement;
  private progressBarStatus: HTMLElement;
  // Play
  @Input() audioContainer: HTMLAudioElement;
  @Input() songList: ISongInfo[];
  private nowPlayingSongId: number;
  private currentSongTime = 0;
  public playingSong: ISongInfo;
  private isPlaying: boolean;
  private isShufflePlay: boolean;
  private isRepeatPlay: boolean;

  constructor(
    private shareService: ShareService,
    private changeProgressBar: ChangeProgressBarService
  ) {}

  ngOnInit(): void {
    this.shareService.nowPlayingSong$.subscribe(songInfo => this.isPlaying = songInfo.isPlaying);
    this.shareService.playSelectedSong$.subscribe(songId => this.playSelectedSong(songId));
    this.progressBar = this.progress.nativeElement;
    this.progressBarStatus = this.progressStatus.nativeElement;
  }

  ngOnChanges(changes): void {
    if (changes.songList.currentValue) {
      this.setSongInfo();
    }
  }

  playSong(): void {
    if (this.isPlaying) {
      this.pauseSong();
      return;
    }

    this.shareService.setNowPlayingSongInfo({ isPlaying: true, songId: this.nowPlayingSongId});

    setTimeout(() => this.audioContainer.play());

    this.refreshInterval = setInterval(() => {
      this.changeSongBarStatusPerSecond();
      this.refreshCurrentSongTime();
    }, 1000);
  }

  pauseSong(): void {
    clearInterval(this.refreshInterval);
    this.audioContainer.pause();
    this.shareService.setNowPlayingSongInfo({ isPlaying: false, songId: this.nowPlayingSongId });
  }

  setSongInfo(id: number = 0): void {
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

  toggleRepeatSong(): void {
    this.isRepeatPlay = !this.isRepeatPlay;
  }

  toggleShufflePlay(): void {
    this.isShufflePlay = !this.isShufflePlay;
  }

  getRandomNumber(max: number, min: number): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  playSelectedSong(selectedSongId: number): void {
    if (selectedSongId === this.nowPlayingSongId && this.isPlaying) {
      this.pauseSong();
      return;
    }

    if (selectedSongId !== this.nowPlayingSongId) {
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

  ngOnDestroy() {}

}
