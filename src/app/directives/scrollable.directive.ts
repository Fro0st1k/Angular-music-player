import { Directive, HostListener, Output, ElementRef, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appScrollable]'
})

export class ScrollableDirective {
  @Output() scrollPosition = new EventEmitter();

  constructor(private el: ElementRef) {}

  @HostListener('scroll', ['$event']) onScroll(event) {
    try {
      const top: number = event.target.scrollTop; // top padding after scrolling
      const height: number = this.el.nativeElement.scrollHeight; // height of scrollable element
      const offset: number = this.el.nativeElement.offsetHeight; // viewed area

      if (top > height - offset - offset * 0.2) {
        this.scrollPosition.emit('bottom');
      }

    } catch (err) {
      console.log(err);
    }
  }
}
