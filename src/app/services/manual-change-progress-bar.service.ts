import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ManualChangeProgressBarService {

  constructor() { }

  moveProgressBarStatus(element: HTMLElement, persentage: number): void {
    element.style.width = `${persentage}%`;
  }

  changeProgressBarStatus(bar: HTMLElement, statusBar: HTMLElement, event: MouseEvent): number {
    const barProperty = bar.getBoundingClientRect();
    const mousePosition = event.pageX - barProperty.left + pageXOffset;
    const shiftPersentage = mousePosition * 100 / barProperty.width;
    this.moveProgressBarStatus(statusBar, shiftPersentage);
    return shiftPersentage;
  }
}
