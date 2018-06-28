import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBgChanger]'
})

export class BgChangerDirective {

  constructor(private element: ElementRef, private render: Renderer2) {
    render.setStyle(element.nativeElement, 'backgroundColor', 'silver');
  }
}
