import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BackgroundChangerService {
  private color: string;
  private secondColor = '#181818';

  constructor() { }

  renderBackground(imgEl: HTMLImageElement, backgroundEl: HTMLElement): void {
    // setTimeout(() => {
    //   this.color = this.calculateColor(imgEl);
    //   backgroundEl.style.background = `${this.setGradient()}`;
    // }, 500);
  }

  setGradient(): string {
    return `linear-gradient(${this.color}, ${this.secondColor})`;
  }

  calculateColor(imgEl: HTMLImageElement): string {
    const rgb = this.getAverageRGB(imgEl);
    return this.rgbToHEX(rgb);
  }

  getAverageRGB(imgEl: HTMLImageElement): Irgb {
    const blockSize = 5;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext && canvas.getContext('2d');
    const defaultRGB: Irgb = { r: 0, g: 0, b: 0 };
    let data: ImageData;
    let width: number;
    let height: number;
    let i = -4;
    let length: number;
    let rgb: Irgb = { r: 0, g: 0, b: 0 };
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
      /* security error, img on diff domain */
      return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;
  }

  rgbToHEX(rgb: Irgb): string {
    return '#' + this.componentToHex(rgb.r) + this.componentToHex(rgb.g) + this.componentToHex(rgb.b);
  }

  componentToHex(color: number): string {
    const hex = color.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }
}

interface Irgb {
  r: number;
  g: number;
  b: number;
}
