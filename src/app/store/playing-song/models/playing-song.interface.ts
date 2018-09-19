import { ISongInfo } from '../../../entities/ISongInfo.interfaces';

export interface IPlayingSong {
  isPlaying: boolean;
  playingSongId: number;
  songList: ISongInfo[];
}
