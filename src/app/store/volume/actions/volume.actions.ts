import { Action } from '@ngrx/store';

export const MUTE = '[Volume] Mute';
export const UNMUTE = '[Volume] Unmute';

export class Mute implements Action {
  readonly type = MUTE;
}

export class Unmute implements Action {
  readonly type = UNMUTE;
  constructor(public value: number) {}
}
// set ne value
//
export type All = Mute | Unmute;
