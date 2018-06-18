import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-album-preview',
  templateUrl: './player-album-preview.component.html',
  styleUrls: ['./player-album-preview.component.scss']
})

export class PlayerAlbumPreviewComponent {
  @Input() album;
}
