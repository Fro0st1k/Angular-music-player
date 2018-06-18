import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShareService {
  private changeIdSubject = new Subject<number>();
  public notifyChangeId = this.changeIdSubject.asObservable();
  public currentSongId = 0;

  private playSongSubject = new Subject<number>();
  public notifyPlaySong = this.playSongSubject.asObservable();
  public isPlaying = false;

  constructor() {}

  public sendNewSongId(id: number): void {
    this.currentSongId = id;
    this.changeIdSubject.next(id);
  }

  public playSong(id: number): void {
    this.playSongSubject.next(id);
  }

  changeSongStatus(status: boolean): void {
    this.isPlaying = status;
  }
}

interface ISongList {
  songList: ISongInfo[];
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
