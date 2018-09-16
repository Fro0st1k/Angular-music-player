import { IVolume } from './../models/volume.interface';
import * as VolumeActions from '../actions/volume.actions';

export type Action = VolumeActions.All;

const defaultState: IVolume = {
  isMuted: false,
  value: 1
};

export const volumeReducer = (state = defaultState, action: Action): IVolume => {
  switch (action.type) {
    case VolumeActions.MUTE:
      return { isMuted: true, value: 0 };
    case VolumeActions.UNMUTE:
      return { isMuted: false, value: action.value };
    default:
      return state;
  }
};
