import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { RequestsHubService } from './requests-hub.service';

@Injectable({
  providedIn: 'root'
})

export class ShareService {
  private data: Observable<ISongList> = this.requestsHubService.getSongList();
  private songListSource = new BehaviorSubject<any>(this.data);
  public songList = this.songListSource.asObservable();

  private changeIdSubject = new Subject<number>();
  public notifyChangeId = this.changeIdSubject.asObservable();
  public currentSongId = 0;

  private playSongSubject = new Subject<number>();
  public notifyPlaySong = this.playSongSubject.asObservable();
  public isPlaying = false;

  constructor(private requestsHubService: RequestsHubService) { }

  public sendNewSongId(id) {
    this.currentSongId = id;
    this.changeIdSubject.next(id);
  }

  public playSong(id: number) {
    this.playSongSubject.next(id);
  }

  changeSongStatus(status: boolean) {
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