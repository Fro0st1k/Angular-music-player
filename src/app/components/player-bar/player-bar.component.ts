import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { ChangeProgressBarService } from '../../services/change-progress-bar.service';
import { ShareService } from '../../services/share.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-player-bar',
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.scss']
})

export class PlayerBarComponent implements OnInit, OnDestroy {

  private refreshInterval: any;
  // SongTime
  @ViewChild('progressBar') progress: ElementRef;
  @ViewChild('progressBarStatus') progressStatus: ElementRef;
  private progressBar: HTMLElement;
  private progressBarStatus: HTMLElement;
  // Play
  @ViewChild('audio') audio: ElementRef;
  private audioContainer: HTMLAudioElement;
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
  ) {}

  ngOnInit(): void {
    // fetch data
    this.dataService.getSongList()
      .subscribe(data => {
        if (data) {
          this.songList = data;
          this.setSongInfo();
          this.audioContainer = this.audio.nativeElement;
        }
      });

    this.shareService.notifyPlaySong
      .subscribe(id => {
        this.playSelectedSong(id);
      });
    // songTime
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

  setSongInfo(id: number = 0): void {
    this.nowPlayingSongId = id;
    this.playingSong = this.songList[id];
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
