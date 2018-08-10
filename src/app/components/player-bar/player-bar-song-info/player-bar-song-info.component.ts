import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-bar-song-info',
  templateUrl: './player-bar-song-info.component.html',
  styleUrls: ['./player-bar-song-info.component.scss']
})
export class PlayerBarSongInfoComponent implements OnInit {
  @Input() playingSong;

  constructor() { }

  ngOnInit() {}

}
