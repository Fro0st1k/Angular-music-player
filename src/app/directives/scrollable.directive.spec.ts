import { ScrollableDirective } from './scrollable.directive';
import { ElementRef } from '@angular/core';

describe('ScrollableDirective', () => {
  it('should create an instance', () => {
    let el: ElementRef;
    const directive = new ScrollableDirective(el);
    expect(directive).toBeTruthy();
  });
});
