import { PaginationService } from './../../services/pagination.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-discover',
  templateUrl: './player-discover.component.html',
  styleUrls: ['./player-discover.component.scss']
})

export class PlayerDiscoverComponent implements OnInit, OnDestroy {
  public categories;
  private dataSub: Subscription;

  constructor(public paginationService: PaginationService) {}

  ngOnInit() {
    this.paginationService.initConfig('categories', { limit: 3 });
    this.dataSub = this.paginationService.data.subscribe(data => {
      this.categories = data;
    });
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }
}
