import { IVolumeState } from './../models/volume.interface';
import * as VolumeActions from '../actions/volume.actions';

export type Action = VolumeActions.All;

const defaultState: IVolumeState = {
  isMuted: false,
  value: 1,
  previousValue: 1
};

export const volumeReducer = (state = defaultState, action: Action): IVolumeState => {
  switch (action.type) {
    case VolumeActions.MUTE:
      return Object.assign({}, state, {
        isMuted: true,
        value: action.payload.value,
        previousValue: action.payload.previousValue
      });
    case VolumeActions.UNMUTE:
      return Object.assign({}, state, {
        isMuted: action.payload.isMuted,
        value: action.payload.value,
        previousValue: action.payload.previousValue
      });
    case VolumeActions.SET_VOLUME:
      return Object.assign({}, state, {
        isMuted: action.payload.isMuted,
        value: action.payload.value,
        previousValue: action.payload.previousValue
      });
    case VolumeActions.SET_VOLUME_SUCCSESS:
      return state;
    default:
      return state;
  }
};
