import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BackgroundChangerService {
  private imageSubject = new Subject<HTMLImageElement>();
  public notifyImageChange = this.imageSubject.asObservable();

  constructor() {}

  public setNewImage(imgEl: HTMLImageElement): void {
    this.imageSubject.next(imgEl);
  }

  public renderBackground(imgEl: HTMLImageElement, bgEl: HTMLElement): void {
    const backgroundColor = this.calculateBackgroundColor(imgEl);
    bgEl.style.background = `${backgroundColor}`;
  }

  private calculateBackgroundColor(imgEl: HTMLImageElement): string {
    const rgb = this.getAverageRGB(imgEl);
    return this.rgbToHEX(rgb);
  }

  private getAverageRGB(imgEl: HTMLImageElement): Irgb {
    const blockSize = 5;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext && canvas.getContext('2d');
    const defaultRGB: Irgb = { r: 0, g: 0, b: 0 };
    let data: ImageData;
    let width: number;
    let height: number;
    let i = -4;
    let length: number;
    const rgb: Irgb = { r: 0, g: 0, b: 0 };
    let count = 0;

    if (!context) {
      return defaultRGB;
    }

    height = canvas.height = imgEl.height;
    width = canvas.width = imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
      data = context.getImageData(0, 0, width, height);
    } catch (e) {
      return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
    }

    rgb.r = Math.floor(rgb.r / count);
    rgb.g = Math.floor(rgb.g / count);
    rgb.b = Math.floor(rgb.b / count);

    return rgb;
  }

  private rgbToHEX(rgb: Irgb): string {
    return '#' + this.colorToHex(rgb.r) + this.colorToHex(rgb.g) + this.colorToHex(rgb.b);
  }

  private colorToHex(color: number): string {
    const hex = color.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }
}

interface Irgb {
  r: number;
  g: number;
  b: number;
}
