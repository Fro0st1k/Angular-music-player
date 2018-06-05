import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-player-bar',
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.scss']
})

export class PlayerBarComponent implements OnInit {
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

  private songList: object[] = [{
    "id": 1,
    "name": "Roupe",
    "duration": 192,
    "artist": "In Flames",
    "cover": "../../../assets/img/album-covers/Battles.jpg",
    "src": "../../../assets/songs/1.mp3"
  },
  {
    "id": 2,
    "name": "Test song",
    "duration": 212,
    "artist": "In Flames",
    "cover": "../../../assets/img/album-covers/Battles.jpg",
    "src": "../../../assets/songs/2.mp3"
  }];

  public playingSong: object = {
    "name": "",
    "artist": "",
    "cover": "",
    "src": ""
  };

  constructor() {}

  ngOnInit(): void {
    this.audioContainer = this.audio.nativeElement;
    this.volumeBar = this.volume.nativeElement;
    this.volumeStatusBar = this.volumeStatus.nativeElement;
    this.setSongInfo();
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

  setSongVolume(volume: number): void {
    this.audioContainer.volume = volume;
  }

  setCurrentVolume(volume: number): void {
    this.currentVolume = volume;
  }

  muteSong(): void {
    if (this.audioContainer.volume) {
      this.setSongVolume(0);
      this.changeVolumeBarStatus(0);
    } else {
      this.setSongVolume(this.currentVolume);
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
    this.setSongVolume(this.currentVolume);
  }
}
