import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class RequestsHubService {
  private artistsUrl: string = 'assets/mocks/artists.json';
  private albumsUrl: string = 'assets/mocks/albums.json';
  private categoriesUrl: string = 'assets/mocks/categories.json';
  private getSongListUrl: string = 'assets/mocks/songList.json';

  constructor(private http: HttpClient) { }

  getArtists() {
    return this.http.get<IArtist>(this.artistsUrl);
  }

  getCategories() {
    return this.http.get<ICategories>(this.categoriesUrl);
  }

  getSongList() {
    return this.http.get<ISongList>(this.getSongListUrl);
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
  cover;
  src;
  duration;
}
