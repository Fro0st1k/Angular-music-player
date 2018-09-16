import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ChangeProgressBarService } from '../../../services/change-progress-bar.service';
import { Store } from '@ngrx/store';
import { IVolume } from '../../../store/volume/models/volume.interface';
import * as VolumeActions from '../../../store/volume/actions/volume.actions';

@Component({
  selector: 'app-player-volume-bar',
  templateUrl: './player-volume-bar.component.html',
  styleUrls: ['./player-volume-bar.component.scss']
})

export class PlayerVolumeBarComponent implements OnInit {
  volumeStore$: Observable<IVolume>;

  @Input() audioContainer;
  @ViewChild('volumeBar') volume: ElementRef;
  @ViewChild('volumeStatus') volumeStatus: ElementRef;
  private volumeBar: HTMLElement;
  private volumeStatusBar: HTMLElement;
  private isMuted = false;
  private currentVolume = 1;

  constructor (
    private changeProgressBar: ChangeProgressBarService,
    private store: Store<IVolume>
  ) {
    this.volumeStore$ = this.store.select('volume');
  }

  ngOnInit() {
    this.volumeBar = this.volume.nativeElement;
    this.volumeStatusBar = this.volumeStatus.nativeElement;
    this.volumeStore$.subscribe(volumeProps => {
      this.isMuted = volumeProps.isMuted;
    });
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
      this.changeProgressBar.moveProgressBarStatus(this.volumeStatusBar, 0);
      this.store.dispatch(new VolumeActions.Mute());
    } else {
      this.setVolume(this.currentVolume);
      this.changeProgressBar.moveProgressBarStatus(this.volumeStatusBar, this.currentVolume * 100);
      this.store.dispatch(new VolumeActions.Unmute(this.currentVolume));
    }
  }

  handChangeVolume(event: MouseEvent): void {
    const shift = this.changeProgressBar.changeProgressBarStatus(this.volumeBar, this.volumeStatusBar, event);
    this.setCurrentVolume(shift / 100);
    this.setVolume(this.currentVolume);
  }
}
