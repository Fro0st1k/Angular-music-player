import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-player-bar',
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.scss']
})

export class PlayerBarComponent implements OnInit {

  @ViewChild('audio') audio: ElementRef;
  private audioContainer: HTMLAudioElement;

  constructor() {}

  ngOnInit(): void {
    this.audioContainer = this.audio.nativeElement;
  }
}
