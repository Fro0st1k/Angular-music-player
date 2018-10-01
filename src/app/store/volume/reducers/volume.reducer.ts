import { IVolumeState } from './../models/volume.interface';
import * as VolumeActions from '../actions/volume.actions';

export type Action = VolumeActions.All;

const defaultState: IVolumeState = {
  isMuted: false,
  value: 1,
  previousValue: 1
};

export function volumeReducer (state = defaultState, action: Action): IVolumeState {
  switch (action.type) {
    case VolumeActions.MUTE:
      return { ...state,
        isMuted: action.payload.isMuted,
        value: action.payload.value,
        previousValue: action.payload.previousValue
      };
    case VolumeActions.UNMUTE:
      return { ...state,
        isMuted: action.payload.isMuted,
        value: action.payload.previousValue,
        previousValue: action.payload.value
      };
    case VolumeActions.SET_VOLUME:
      return { ...state,
        isMuted: action.payload.isMuted,
        value: action.payload.value,
        previousValue: action.payload.previousValue
      };
    case VolumeActions.SET_VOLUME_SUCCSESS:
      return state;
    default:
      return state;
  }
}
