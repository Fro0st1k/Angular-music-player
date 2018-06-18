import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RequestsHubService {
  private categoriesUrl = 'assets/mocks/categories.json';
  private getSongListUrl = 'assets/mocks/songList.json';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategories> {
    return this.http.get<ICategories>(this.categoriesUrl);
  }

  getSongList(): Observable<ISongList> {
    return this.http.get<ISongList>(this.getSongListUrl);
  }

  getFoundAlbums(inputValue: string): Observable<ISongInfo> {
    return this.getSongList().pipe(
      switchMap(data => data.songList),
      filter(song => song.albumName.toLowerCase().indexOf(inputValue) !== -1),
    );
  }
}


interface ICategories {
  categories: object[];
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
