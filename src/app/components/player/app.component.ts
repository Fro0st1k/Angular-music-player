import { PaginationService } from './../../services/pagination.service';
import { Component, OnInit } from '@angular/core';
import { routeAnimation } from '../../animations/route-animation';
import { Router, Event, NavigationStart } from '@angular/router';
import { BackgroundChangerService } from '../../services/background-changer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routeAnimation ]
})

export class AppComponent implements OnInit {
  public menuIsHidden: boolean;
  public isLibrary: boolean;
  private backgroundElement: HTMLElement;

  constructor(
    private router: Router,
    private backgroundChangerService: BackgroundChangerService,
    private paginationService: PaginationService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        event.url === '/search' ? this.menuIsHidden = false : this.menuIsHidden = true;
        event.url === '/library' ? this.isLibrary = true : this.isLibrary = false;
      }
    });
  }

  ngOnInit() {
    this.backgroundChangerService.notifyImageChange.subscribe( imgEl => {
      this.backgroundElement = document.querySelector('.content__background');
      this.backgroundChangerService.renderBackground(imgEl, this.backgroundElement);
    });
  }

  prepRouteState(outlet: any) {
    return outlet.activatedRouteData['animation'] || '';
  }

  loadNextData(eventName: string): void {
    if (eventName === 'bottom') {
      this.paginationService.getNextData();
    }
  }
}
