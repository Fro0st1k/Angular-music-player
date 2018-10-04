import { Action } from '@ngrx/store';
import { ISongInfo } from '../../../entities/interfaces/ISongInfo.interface';

export const PLAY = '[Playing song] Play';
export const PAUSE = '[Playing song] Pause';
export const PLAY_NEXT = '[Playing song] Play next';
export const PLAY_PREVIOUS = '[Playing song] Play previous';
export const PLAY_SELECTED = '[Playing song] Play selected';

export class Play implements Action {
  readonly type = PLAY;
  constructor(public songInfo: any) {}
}

export class Pause implements Action {
  readonly type = PAUSE;
  constructor(public songInfo: any) {}
}

export class PlayNext implements Action {
  readonly type = PLAY_NEXT;
  constructor(public songInfo: any) {}
}

export class PlayPrevious implements Action {
  readonly type = PLAY_PREVIOUS;
  constructor(public songInfo: any) {}
}

export class PlaySelected implements Action {
  readonly type = PLAY_SELECTED;
  constructor(public songInfo: any) { }
}

export type All = Play | Pause | PlayNext | PlayPrevious | PlaySelected;
