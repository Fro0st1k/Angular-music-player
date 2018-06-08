import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-library',
  templateUrl: './player-library.component.html',
  styleUrls: ['./player-library.component.scss']
})
export class PlayerLibraryComponent implements OnInit {
  private songList = [{
    "id": 1,
    "name": "Test song 1",
    "artist": "Test artist 1",
    "album": "Test album name",
    "cover": "../../../assets/img/album-covers/Battles.jpg",
    "src": "../../../assets/songs/1.mp3",
    "duration": 182
  },
  {
    "id": 2,
    "name": "Test song 2",
    "artist": "Test artist 2",
    "album": "Test album name",
    "cover": "../../../assets/img/album-covers/GUNSHIP.jpg",
    "src": "../../../assets/songs/2.mp3",
    "duration": 163
  },
  {
    "id": 3,
    "name": "Test song 3",
    "artist": "Test artist 3",
    "album": "Test album name",
    "cover": "../../../assets/img/album-covers/OneMoreLight.jpg",
    "src": "../../../assets/songs/3.mp3",
    "duration": 202
  }];

  constructor() { }

  ngOnInit() {
  }

}
