import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[bgChanger]'
})

export class BgChangerDirective {
  private color = '#52BFD7';
  private secondColor = '#181818';

  constructor(private element: ElementRef, private render: Renderer2) {
    render.setStyle(element.nativeElement, 'background', this.setGradient());
  }

  setGradient(): string {
    return `linear-gradient(${this.color}, ${this.secondColor})`;
  }
}
