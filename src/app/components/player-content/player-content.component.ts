import { Component, OnInit } from '@angular/core';
import { RequestsHubService } from '../../services/requests-hub.service';

@Component({
  selector: 'app-player-content',
  templateUrl: './player-content.component.html',
  styleUrls: ['./player-content.component.scss'],
  providers: [RequestsHubService]
})

export class PlayerContentComponent implements OnInit {

  
  constructor(private requestsHubService: RequestsHubService) { }
  ngOnInit() {
    // this.requestsHubService.getArtists().subscribe(data => {
    //   console.log(data);
    // });
  }

}
