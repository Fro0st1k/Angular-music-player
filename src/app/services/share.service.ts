import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShareService {
  private changeIdSubject = new Subject<number>();
  public notifyChangeId = this.changeIdSubject.asObservable();
  public currentSongId = 0;

  private playSongSubject = new Subject<number>();
  public notifyPlaySong = this.playSongSubject.asObservable();
  private isPlaying = false;

  constructor() {}

  public sendNewSongId(id: number): void {
    this.currentSongId = id;
    this.changeIdSubject.next(id);
  }

  public playCurrentSong(id: number): void {
    this.playSongSubject.next(id);
  }

  public changeSongStatus(status: boolean): void {
    this.isPlaying = status;
  }

  public getSongStatus(): boolean {
    return this.isPlaying;
  }
}
