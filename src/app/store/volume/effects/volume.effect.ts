import { Injectable } from '@angular/core';;
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ChangeProgressBarService } from '../../../services/change-progress-bar.service';

import * as volumeActions from '../actions/volume.actions';
export type Action = volumeActions.All;

@Injectable()

export class VolumeEffects {

  @Effect()
  muteVolume$: Observable<Action> = this.actions$.pipe(
    ofType(volumeActions.MUTE),
    tap(data => console.log(data)),
    map((action: volumeActions.Mute) => new volumeActions.SetVolume(action.payload))
  );

  @Effect()
  unmuteVolume$: Observable<Action> = this.actions$.pipe(
    ofType(volumeActions.UNMUTE),
    map((action: volumeActions.Unmute) => new volumeActions.SetVolume(action.payload))
  );

  @Effect()
  setVolume$: Observable<Action> = this.actions$.pipe(
    ofType(volumeActions.SET_VOLUME),
    tap(data => console.log(data)),
    tap((action: volumeActions.SetVolume) => {
      this.changeProgressBarService.moveProgressBarStatus(action.payload.data.element, action.payload.data.width);
    }),
    map(previousAction => new volumeActions.SetVolumeSuccsess())
  );

  constructor(private actions$: Actions, private changeProgressBarService: ChangeProgressBarService) { }
}
