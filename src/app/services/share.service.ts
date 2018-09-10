import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShareService {
  private nowPlayingSongSubject = new BehaviorSubject<INowPlayingSong>({ isPlaying: false, songId: 0 });
  public nowPlayingSong$ = this.nowPlayingSongSubject.asObservable();

  private playSelectedSongSubject = new Subject<number>();
  public playSelectedSong$ = this.playSelectedSongSubject.asObservable();

  constructor() {}

  public setNowPlayingSongInfo(songInfo: INowPlayingSong): void {
    this.nowPlayingSongSubject.next(songInfo);
  }

  public playSelectedSong(songInfo): void {
    this.playSelectedSongSubject.next(songInfo);
  }
}

interface INowPlayingSong {
  isPlaying: boolean;
  songId: number | null;
}
