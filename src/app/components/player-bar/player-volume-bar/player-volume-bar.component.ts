import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ChangeProgressBarService } from '../../../services/change-progress-bar.service';
import { Store } from '@ngrx/store';
import { IVolumeState } from '../../../store/volume/models/volume.interface';
import * as VolumeActions from '../../../store/volume/actions/volume.actions';

@Component({
  selector: 'app-player-volume-bar',
  templateUrl: './player-volume-bar.component.html',
  styleUrls: ['./player-volume-bar.component.scss']
})

export class PlayerVolumeBarComponent implements OnInit {
  volumeStore$: Observable<IVolumeState>;

  @Input() audioContainer;
  @ViewChild('volumeBar') volume: ElementRef;
  @ViewChild('volumeStatus') volumeStatus: ElementRef;
  private volumeBar: HTMLElement;
  private volumeStatusBar: HTMLElement;
  private isMuted: boolean;
  private previousValue = 1;

  constructor (
    private changeProgressBar: ChangeProgressBarService,
    private store: Store<IVolumeState>
  ) {
    this.volumeStore$ = this.store.select('volume');
  }

  ngOnInit() {
    this.volumeBar = this.volume.nativeElement;
    this.volumeStatusBar = this.volumeStatus.nativeElement;
    this.volumeStore$.subscribe(volumeProps => {
      this.isMuted = volumeProps.isMuted;
      this.setCurrentVolume(volumeProps.value);
      this.previousValue = volumeProps.previousValue;
    });
  }

  setCurrentVolume(volume: number): void {
    this.audioContainer.volume = volume;
  }

  muteSong(): void {
    if (this.audioContainer.volume) {
      this.store.dispatch(new VolumeActions.Mute({
        isMuted: true,
        value: 0,
        previousValue: this.previousValue,
        data: { element: this.volumeStatusBar, width: 0 }
      }));
    } else {
      this.store.dispatch(new VolumeActions.Unmute({
        isMuted: false,
        value: this.previousValue,
        previousValue: this.previousValue,
        data: { element: this.volumeStatusBar, width: this.previousValue * 100 }
      }));
    }
  }

  handChangeVolume(event: MouseEvent): void {
    const shift = this.changeProgressBar.calculateShiftProgressBarStatus(this.volumeBar, event);

    this.store.dispatch(new VolumeActions.SetVolume({
      value: shift / 100,
      previousValue: shift / 100,
      isMuted: false,
      data: { element: this.volumeStatusBar, width: shift }
    }));
  }
}
