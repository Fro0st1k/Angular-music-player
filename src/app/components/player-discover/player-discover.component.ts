import { PaginationService } from './../../services/pagination.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-discover',
  templateUrl: './player-discover.component.html',
  styleUrls: ['./player-discover.component.scss']
})

export class PlayerDiscoverComponent implements OnInit, OnDestroy {
  public categories;
  private dataSub: Subscription;

  constructor(private paginationService: PaginationService) {}

  ngOnInit() {
    this.paginationService.initConfig('categories', '', { limit: 2 });
    this.dataSub = this.paginationService.data.subscribe(data => {
      this.categories = data;
    });
  }

  loadNextData(eventName) {
    if (eventName === 'bottom') {
      console.log('getData');
      this.paginationService.getNextData();
    }
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }
}
