import { Component, Input } from '@angular/core';
import { ISongInfo } from '../../../entities/interfaces/ISongInfo.interface';

@Component({
  selector: 'app-player-bar-song-info',
  templateUrl: './player-bar-song-info.component.html',
  styleUrls: ['./player-bar-song-info.component.scss']
})

export class PlayerBarSongInfoComponent {
  @Input() nowPlayingSong: ISongInfo;
}
