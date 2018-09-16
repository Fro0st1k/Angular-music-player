import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-content',
  templateUrl: './player-content.component.html',
  styleUrls: ['./player-content.component.scss']
})

export class PlayerContentComponent implements OnInit, OnDestroy {
  public categories;
  private dataSub: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataSub = this.dataService.getCategoriesList().subscribe(data => this.categories = data);
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }
}
