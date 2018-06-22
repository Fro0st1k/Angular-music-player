import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { RequestsHubService } from './requests-hub.service';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private songList: ISongInfo[];
  private songListSource = new BehaviorSubject<any>(this.songList);
  private songListObs = this.songListSource.asObservable();
  private songListIsFetching = false;

  private categoriesList: object[];
  private categoriesSource = new BehaviorSubject<any>(this.categoriesList);
  private categoriesObs = this.categoriesSource.asObservable();

  constructor(private requestsHubService: RequestsHubService) {}

  getCategoriesListFromServer(): void {
    this.requestsHubService.getCategories().subscribe(data => {
      this.categoriesList = data.categories;
      this.categoriesSource.next(data.categories);
    });
  }

  getCategoriesList(): Observable<ICategories> {
    if (!this.categoriesList) {
      this.getCategoriesListFromServer();
    }

    return this.categoriesObs;
  }

  getSongListFromServer(): void {
    this.songListIsFetching = true;
    this.requestsHubService.getSongList().subscribe(data => {
      this.songList = data.songList;
      this.songListSource.next(data.songList);
      this.songListIsFetching = false;
    });
  }

  getSongList(): Observable<ISongInfo[]> {
    if (!this.songList && !this.songListIsFetching) {
      this.getSongListFromServer();
    }

    return this.songListObs;
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

interface ICategories {
  categories: object[];
}
