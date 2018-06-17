import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RequestsHubService {
  private artistsUrl = 'assets/mocks/artists.json';
  private albumsUrl = 'assets/mocks/albums.json';
  private categoriesUrl = 'assets/mocks/categories.json';
  private getSongListUrl = 'assets/mocks/songList.json';

  constructor(private http: HttpClient) { }

  getArtists() {
    return this.http.get<IArtist>(this.artistsUrl);
  }

  getCategories() {
    console.log('fetch categories');
    return this.http.get<ICategories>(this.categoriesUrl);
  }

  getSongList() {
    console.log('fetch song list');
    return this.http.get<ISongList>(this.getSongListUrl);
  }

  getFoundAlbums(inputValue) {
    return this.getSongList().pipe(
      switchMap(data => data.songList),
      filter(song => song.albumName.toLowerCase().indexOf(inputValue) !== -1),
    );
  }
}

interface IArtist {
  artists: object[];
}

interface ICategories {
  categories: object[];
}

interface IAlbums {
  albums: object[];
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
