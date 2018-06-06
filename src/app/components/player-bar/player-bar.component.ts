import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-player-bar',
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.scss']
})

export class PlayerBarComponent implements OnInit {

  private refreshInterval: any;
  //SongTime
  @ViewChild('progressBar') progress: ElementRef;
  @ViewChild('progressBarStatus') progressStatus: ElementRef;
  private progressBar: HTMLElement;
  private progressBarStatus: HTMLElement;
  //Volume
  @ViewChild('volumeBar') volume: ElementRef;
  @ViewChild('volumeStatus') volumeStatus: ElementRef;
  private volumeBar: HTMLElement;
  private volumeStatusBar: HTMLElement;
  
  //Play
  @ViewChild('audio') audio: ElementRef;
  private isPlaying: boolean = false;
  private audioContainer: HTMLAudioElement;
  private nowPlayingSongId: number;
  private currentVolume: number = 1;

  private songList: ISongInfo[] = [{
    "id": 1,
    "name": "Roupe",
    "artist": "In Flames",
    "cover": "../../../assets/img/album-covers/Battles.jpg",
    "src": "../../../assets/songs/1.mp3"
  },
  {
    "id": 2,
    "name": "Test song",
    "artist": "In Flames",
    "cover": "../../../assets/img/album-covers/Battles.jpg",
    "src": "../../../assets/songs/2.mp3"
  }];

  public playingSong: ISongInfo;

  constructor() {}

  ngOnInit(): void {
    //songTime
    this.progressBar = this.progress.nativeElement;
    this.progressBarStatus = this.progressStatus.nativeElement;
    // volume
    this.volumeBar = this.volume.nativeElement;
    this.volumeStatusBar = this.volumeStatus.nativeElement;
    // song
    this.audioContainer = this.audio.nativeElement;
    this.setSongInfo();
  }

  playSong(): void {
    if (this.isPlaying) {
      this.pauseSong();
      clearInterval(this.refreshInterval);
      return;
    }

    this.isPlaying = true;
    setTimeout(() => {
      this.audioContainer.play();
    });

    this.refreshInterval = setInterval(() => {
      this.autoChangeSongBarStatus();
    }, 1000)
  }

  pauseSong(): void {
    this.audioContainer.pause();
    this.isPlaying = false;
  }

  setSongInfo(id: number = 0): void {
    this.nowPlayingSongId = id;
    this.playingSong = this.songList[id];
  }

  playNextSong(): void {
    this.pauseSong();
    if (this.nowPlayingSongId < this.songList.length) {
      this.setSongInfo(++this.nowPlayingSongId);
    } else {
      this.setSongInfo();
    }
    this.playSong();
  }

  playPreviousSong(): void {
    this.pauseSong();
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
    } else {
      this.setVolume(this.currentVolume);
      this.changeVolumeBarStatus(this.currentVolume * 100);
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
    let progressBarStatusWidth = parseFloat(this.progressBarStatus.style.width) || 0;
    this.progressBarStatus.style.width = `${progressBarStatusWidth + persentage}%`;
  }

  autoChangeSongBarStatus(): void {
    const dislocationPerSecond = 100 / this.getCurrentSongDuration();
    this.changeSongBarStatusPerSecond(dislocationPerSecond);
  }
}

interface ISongInfo {
  id,
  name,
  artist,
  cover,
  src
} 