import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-content-box',
  templateUrl: './player-content-box.component.html',
  styleUrls: ['./player-content-box.component.scss'],
  providers: []
})

export class PlayerContentBoxComponent {
  @Input() category;
}
