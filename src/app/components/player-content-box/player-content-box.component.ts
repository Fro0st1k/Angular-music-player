import { Component, OnInit, Output } from '@angular/core';
import { RequestsHubService } from '../../services/requests-hub.service';

@Component({
  selector: 'app-player-content-box',
  templateUrl: './player-content-box.component.html',
  styleUrls: ['./player-content-box.component.scss'],
  providers: [RequestsHubService]
})

export class PlayerContentBoxComponent implements OnInit {
  public categories;

  constructor(private requestsHubService: RequestsHubService) { }

  ngOnInit() {
    this.requestsHubService.getCategories().subscribe(data => {
      this.categories = data.categories;
    });
  }

}
