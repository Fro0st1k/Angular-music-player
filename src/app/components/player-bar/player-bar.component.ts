import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ChangeProgressBarService } from '../../services/change-progress-bar.service';
import { ShareService } from '../../services/share.service';
import { DataService } from '../../services/data.service';

import { ISongInfo } from '../../entities/interfaces.ISongInfo';
import { ISongList } from '../../entities/interfaces.ISongList';

@Component({
  selector: 'app-player-bar',
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.scss']
})

export class PlayerBarComponent implements OnInit {

  @ViewChild('audio') audio: ElementRef;
  private audioContainer: HTMLAudioElement;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.audioContainer = this.audio.nativeElement;
  }
}
