import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
  transition('* => search', [
    style({ opacity: 0 }),
    animate('0.3s 0.1s')
  ]),
  transition('home => discover', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('0.3s 0.1s ease-out')
  ]),
  transition('discover => home', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('0.3s 0.1s ease-out')
  ]),
  transition('discover => library', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('0.3s 0.1s ease-out')
  ]),
  transition('library => discover', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('0.3s 0.1s ease-out')
  ]),
  transition('home <=> library', [
    style({ opacity: 0 }),
    animate('0.3s 0.1s')
  ]),
  transition('search => *', [
    style({ opacity: 0 }),
    animate('0.3s 0.1s')
  ])
]);

