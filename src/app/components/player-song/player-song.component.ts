import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-song',
  templateUrl: './player-song.component.html',
  styleUrls: ['./player-song.component.scss']
})

export class PlayerSongComponent implements OnInit {
  private isPlaying = false;
  @Input() song;

  constructor() { }

  ngOnInit() {}

}
