import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { ManualChangeProgressBarService } from './../../services/manual-change-progress-bar.service';
import { ShareService } from './../../services/share.service';
import { DataService } from './../../services/data.service';

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

  constructor(
    private shareService: ShareService,
    private dataService: DataService,
    private manualChangeProgressBar: ManualChangeProgressBarService
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
      this.autoChangeSongBarStatus();
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

  playNextSong(): void {
    this.pauseSong();
    this.manualChangeProgressBar.moveProgressBarStatus(this.progressBarStatus, 0);
    if (this.nowPlayingSongId < this.songList.length) {
      this.setSongInfo(++this.nowPlayingSongId);
    } else {
      this.setSongInfo();
    }
    this.playSong();
  }

  playPreviousSong(): void {
    this.pauseSong();
    this.manualChangeProgressBar.moveProgressBarStatus(this.progressBarStatus, 0);
    if (this.nowPlayingSongId > 0) {
      this.setSongInfo(--this.nowPlayingSongId);
    } else {
      this.setSongInfo();
    }
    this.playSong();
  }

  playSelectedSong(selectedSongId: number): void {
    if (this.shareService.getSongStatus() && selectedSongId === this.shareService.currentSongId) {
      this.pauseSong();
      return;
    }

    if (selectedSongId !== this.shareService.currentSongId) {
      this.manualChangeProgressBar.moveProgressBarStatus(this.progressBarStatus, 0);
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
    const shift = this.manualChangeProgressBar.changeProgressBarStatus(this.progressBar, this.progressBarStatus, event);
    this.setCurrentSongTime(this.getCurrentSongDuration() * shift / 100);
  }

  changeSongBarStatusPerSecond(persentage: number): void {
    const progressBarStatusWidth = parseFloat(this.progressBarStatus.style.width) || 0;
    if (this.audioContainer.ended) {
      this.playNextSong();
      return;
    }
    this.progressBarStatus.style.width = `${progressBarStatusWidth + persentage}%`;
  }

  autoChangeSongBarStatus(): void {
    const dislocationPerSecond = 100 / this.getCurrentSongDuration();
    this.changeSongBarStatusPerSecond(dislocationPerSecond);
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
