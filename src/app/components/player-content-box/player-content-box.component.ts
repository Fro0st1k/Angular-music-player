import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-content-box',
  templateUrl: './player-content-box.component.html',
  styleUrls: ['./player-content-box.component.scss'],
  providers: []
})

export class PlayerContentBoxComponent implements OnInit, OnDestroy {
  public categories;
  private dataSub: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getCategoriesList();
    this.dataSub = this.dataService.categoriesObs.subscribe(data => this.categories = data);
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }
}
