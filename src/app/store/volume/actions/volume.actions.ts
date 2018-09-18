import { Action } from '@ngrx/store';

export const MUTE = '[Volume] Mute';
export const UNMUTE = '[Volume] Unmute';
export const SET_VOLUME = '[Volume] Set volume';
export const SET_VOLUME_SUCCSESS = '[Volume] Set volume success';

export class Mute implements Action {
  readonly type = MUTE;
  constructor(public payload: Ipayload) {}
}

export class Unmute implements Action {
  readonly type = UNMUTE;
  constructor(public payload: Ipayload) {}
}

export class SetVolume implements Action {
  readonly type = SET_VOLUME;
  constructor(public payload: Ipayload) {}
}

export class SetVolumeSuccsess implements Action {
  readonly type = SET_VOLUME_SUCCSESS;
}

export type All = Mute | Unmute | SetVolume | SetVolumeSuccsess;

interface Ipayload {
  value?: number;
  previousValue?: number;
  isMuted?: boolean;
  data?: any;
}
