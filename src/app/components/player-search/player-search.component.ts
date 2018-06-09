import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { tap, map, filter, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { RequestsHubService } from '../../services/requests-hub.service';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.scss']
})

export class PlayerSearchComponent implements OnInit {
  private albums = [];
  @ViewChild('searchBox') searchBox: ElementRef;

  constructor(private requestsHubService: RequestsHubService) { }

  ngOnInit() {
    this.startWatchigInput().subscribe(data => this.albums.push(data));
  }

  startWatchigInput() {
    return fromEvent(this.searchBox.nativeElement, 'input').pipe(
      map((e: KeyboardEvent) => e.target.value.toLowerCase()),
      filter(text => text.length > 3),
      debounceTime(20),
      distinctUntilChanged(),
      tap(() => this.albums = []),
      switchMap((text) => this.requestsHubService.getFoundAlbums(text))
    );
  }
}
