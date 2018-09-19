import { IPlayingSong } from '../models/playing-song.interface';
import * as PlayingSongActions from '../actions/playing-song.actions';

export type Action = PlayingSongActions.All;

const defaultState: IPlayingSong = {
  isPlaying: false,
  playingSongId: 0,
  songList: []
};

export const playingSongReduser = (state = defaultState, action: Action) => {
  switch (action.type) {
    case PlayingSongActions.PLAY:
      return { ...state,
        isPlaying: true,
        playingSongId: action.songInfo.songId
      };
    case PlayingSongActions.PAUSE:
      return { ...state,
        isPlaying: false
      };
    default:
      return state;
  }
};
