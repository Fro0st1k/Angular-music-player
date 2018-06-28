import { Component } from '@angular/core';
import { routeAnimation } from '../../animations/route-animation';
import { ActivatedRoute, Router, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routeAnimation ]
})

export class AppComponent {
  private menuIsHidden: boolean;
  private isLibrary: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        event.url === '/search' ? this.menuIsHidden = false : this.menuIsHidden = true;
        event.url === '/library' ? this.isLibrary = true : this.isLibrary = false;
      }
    });
  }

  prepRouteState(outlet: any) {
    return outlet.activatedRouteData['animation'] || '';
  }
}
