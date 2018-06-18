import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestsHubService } from './requests-hub.service';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private songList: ISongInfo[];
  private songListSource = new BehaviorSubject<any>(this.songList);
  public songListObs = this.songListSource.asObservable();

  private categoriesList;
  private categoriesSource = new BehaviorSubject<any>(this.categoriesList);
  public categoriesObs = this.categoriesSource.asObservable();

  constructor(private requestsHubService: RequestsHubService) {
    this.requestsHubService.getSongList().subscribe(data => {
      this.songList = data.songList;
      this.songListSource.next(data.songList);
    });

    this.requestsHubService.getCategories().subscribe(data => {
      this.categoriesList = data.categories;
      this.categoriesSource.next(data.categories);
    });
  }

  getCategoriesList() {
    return this.categoriesList;
  }

  getSongList() {
    return this.songList;
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
