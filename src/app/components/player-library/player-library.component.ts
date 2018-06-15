import { Component, OnInit } from '@angular/core';
import { RequestsHubService } from '../../services/requests-hub.service';

@Component({
  selector: 'app-player-library',
  templateUrl: './player-library.component.html',
  styleUrls: ['./player-library.component.scss']
})
export class PlayerLibraryComponent implements OnInit {
  private songList;

  constructor(private requestsHubService: RequestsHubService) { }

  ngOnInit() {
    this.requestsHubService
      .getSongList()
      .subscribe(data => this.songList = data.songList);
  }
}
