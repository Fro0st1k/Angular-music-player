import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RequestsHubService } from '../../services/requests-hub.service';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-player-bar',
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.scss'],
  providers: [RequestsHubService]
})

export class PlayerBarComponent implements OnInit {

  private refreshInterval: any;
  // SongTime
  @ViewChild('progressBar') progress: ElementRef;
  @ViewChild('progressBarStatus') progressStatus: ElementRef;
  private progressBar: HTMLElement;
  private progressBarStatus: HTMLElement;
  // Volume
  @ViewChild('volumeBar') volume: ElementRef;
  @ViewChild('volumeStatus') volumeStatus: ElementRef;
  private volumeBar: HTMLElement;
  private volumeStatusBar: HTMLElement;
  // Play
  @ViewChild('audio') audio: ElementRef;
  private isPlaying = false;
  private isMuted = false;
  private audioContainer: HTMLAudioElement;
  private nowPlayingSongId: number;
  private currentVolume = 1;

  private songList: ISongInfo[];
  public playingSong: ISongInfo;

  constructor(private requestsHubService: RequestsHubService) {}

  ngOnInit(): void {
    // fetch data
    this.requestsHubService.getSongList()
      .subscribe(data => {
        this.songList = data.songList;
        this.setSongInfo();
        this.audioContainer = this.audio.nativeElement;
      });
    // songTime
    this.progressBar = this.progress.nativeElement;
    this.progressBarStatus = this.progressStatus.nativeElement;
    // volume
    this.volumeBar = this.volume.nativeElement;
    this.volumeStatusBar = this.volumeStatus.nativeElement;
  }

  playSong(): void {
    if (this.isPlaying) {
      this.pauseSong();
      return;
    }

    this.isPlaying = true;
    setTimeout(() => {
      this.audioContainer.play();
    });

    this.refreshInterval = setInterval(() => {
      this.autoChangeSongBarStatus();
    }, 1000);
  }

  pauseSong(): void {
    clearInterval(this.refreshInterval);
    this.audioContainer.pause();
    this.isPlaying = false;
  }

  setSongInfo(id: number = 0): void {
    this.nowPlayingSongId = id;
    this.playingSong = this.songList[id];
    this.playingSong.duration = this.convertSongTime(this.songList[id].duration);
  }

  playNextSong(): void {  // dry
    this.pauseSong();
    this.changeSongBarStatus(0);
    if (this.nowPlayingSongId < this.songList.length) {
      this.setSongInfo(++this.nowPlayingSongId);
    } else {
      this.setSongInfo();
    }
    this.playSong();
  }

  playPreviousSong(): void { // dry
    this.pauseSong();
    this.changeSongBarStatus(0);
    if (this.nowPlayingSongId > 0) {
      this.setSongInfo(--this.nowPlayingSongId);
    } else {
      this.setSongInfo();
    }
    this.playSong();
  }

  playSelectedSong(selectedSongId: number): void {
    this.pauseSong();
    this.setSongInfo(selectedSongId);
    this.playSong();
  }

  setVolume(volume: number): void {
    this.audioContainer.volume = volume;
  }

  setCurrentVolume(volume: number): void {
    this.currentVolume = volume;
  }

  muteSong(): void {
    if (this.audioContainer.volume) {
      this.setVolume(0);
      this.changeVolumeBarStatus(0);
      this.isMuted = true;
    } else {
      this.setVolume(this.currentVolume);
      this.changeVolumeBarStatus(this.currentVolume * 100);
      this.isMuted = false;
    }
  }

  changeVolumeBarStatus(persentage: number): void {
    this.volumeStatusBar.style.width = `${persentage}%`;
  }

  handChangeVolume(event: MouseEvent): void {
    const volumeBarProperty = this.volumeBar.getBoundingClientRect();
    const mousePosition = event.pageX - volumeBarProperty.left + pageXOffset;
    const volumePersentage = mousePosition * 100 / volumeBarProperty.width;
    this.changeVolumeBarStatus(volumePersentage);
    this.setCurrentVolume(volumePersentage / 100);
    this.setVolume(this.currentVolume);
  }

  getCurrentSongDuration(): number {
    return this.audioContainer.duration;
  }

  setCurrentSongTime(time: number): void {
    this.audioContainer.currentTime = time;
  }

  getCurrentSongTime(): number {
    return this.audioContainer.currentTime;
  }

  changeSongBarStatus(persentage: number): void {
    this.progressBarStatus.style.width = `${persentage}%`;
  }

  handChangeCurrentSongTime(event: MouseEvent): void {
    const progressBarProperty = this.progressBar.getBoundingClientRect();
    const mousePosition = event.pageX - progressBarProperty.left + pageXOffset;
    const currentSongTimePersentage = mousePosition * 100 / progressBarProperty.width;
    this.changeSongBarStatus(currentSongTimePersentage);
    this.setCurrentSongTime(this.getCurrentSongDuration() * currentSongTimePersentage / 100);
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

  convertSongTime(duration = 0): string {
    if (typeof duration == 'string') return duration;

    let minutes: string =  `${~~(duration / 60)}`;
    let seconds: string =  `${duration % 60}`;

    if (minutes.length < 2) minutes = `0${minutes}`;
    if (seconds.length < 2) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  }
}

interface ISongInfo {
  id;
  name;
  artist;
  album;
  cover;
  src;
  duration;
}
