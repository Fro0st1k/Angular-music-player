import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { tap, map, filter, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';
import { RequestsHubService } from '../../services/requests-hub.service';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.scss']
})

export class PlayerSearchComponent implements OnInit, OnDestroy {
  private albums = [];
  private searchInput: HTMLInputElement;
  private searchSubscription: Subscription;
  @ViewChild('searchBox') searchBox: ElementRef;

  constructor(private requestsHubService: RequestsHubService) { }

  ngOnInit() {
    this.searchInput = this.searchBox.nativeElement;
    this.searchSubscription = this.startWatchigInput().subscribe(data => this.albums.push(data));
  }

  startWatchigInput() {
    return fromEvent(this.searchInput, 'input').pipe(
      map((e: KeyboardEvent) => this.searchInput.value.toLowerCase()),
      filter(text => text.length > 3),
      debounceTime(30),
      distinctUntilChanged(),
      tap(() => this.albums = []),
      switchMap((text) => this.requestsHubService.getFoundAlbums(text))
    );
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
