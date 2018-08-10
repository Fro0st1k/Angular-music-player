import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ChangeProgressBarService {

  constructor() { }

  moveProgressBarStatus(statusBar: HTMLElement, persentage: number): void {
    statusBar.style.width = `${persentage}%`;
  }

  changeProgressBarStatus(bar: HTMLElement, statusBar: HTMLElement, event: MouseEvent): number {
    const barProperty = bar.getBoundingClientRect();
    const mousePosition = event.pageX - barProperty.left + pageXOffset;
    const shiftPersentage = mousePosition * 100 / barProperty.width;
    this.moveProgressBarStatus(statusBar, shiftPersentage);
    return shiftPersentage;
  }

  changeProgressBarStatusPerSecond(statusBar: HTMLElement, persentage: number): void {
    const progressBarStatusWidth = parseFloat(statusBar.style.width) || 0;
    statusBar.style.width = `${progressBarStatusWidth + persentage}%`;
  }
}
