import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertSeconds'
})

export class ConvertSecondsPipe implements PipeTransform {

  transform(duration: number, args?: any): string {
    let minutes = `${~~(duration / 60)}`;
    let seconds = `${~~(duration % 60)}`;

    if (minutes.length < 2) {
      minutes = `0${minutes}`;
    }

    if (seconds.length < 2) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }
}
