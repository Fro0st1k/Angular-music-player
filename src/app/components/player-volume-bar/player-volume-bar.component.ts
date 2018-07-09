import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ManualChangeProgressBarService } from '../../services/manual-change-progress-bar.service'

@Component({
  selector: 'app-player-volume-bar',
  templateUrl: './player-volume-bar.component.html',
  styleUrls: ['./player-volume-bar.component.scss']
})

export class PlayerVolumeBarComponent implements OnInit {
  @Input() audioContainer;
  @ViewChild('volumeBar') volume: ElementRef;
  @ViewChild('volumeStatus') volumeStatus: ElementRef;
  private volumeBar: HTMLElement;
  private volumeStatusBar: HTMLElement;
  private isMuted = false;
  private currentVolume = 1;

  constructor( private manualChangeProgressBar: ManualChangeProgressBarService) { }

  ngOnInit() {
    this.volumeBar = this.volume.nativeElement;
    this.volumeStatusBar = this.volumeStatus.nativeElement;
  }

  setVolume(volume: number): void {
    this.audioContainer.volume = volume;
  }

  setCurrentVolume(volume: number): void {
    this.currentVolume = volume;
  }

  muteSong(): void {
    if (this.audioContainer.volume) {
      this.setVolume(0);
      this.manualChangeProgressBar.moveProgressBarStatus(this.volumeStatusBar, 0);
      this.isMuted = true;
    } else {
      this.setVolume(this.currentVolume);
      this.manualChangeProgressBar.moveProgressBarStatus(this.volumeStatusBar, this.currentVolume * 100);
      this.isMuted = false;
    }
  }

  handChangeVolume(event: MouseEvent): void {
    const shift = this.manualChangeProgressBar.changeProgressBarStatus(this.volumeBar, this.volumeStatusBar, event);
    this.setCurrentVolume(shift / 100);
    this.setVolume(this.currentVolume);
  }
}
