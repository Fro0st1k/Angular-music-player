import { ISongInfo } from '../../../entities/interfaces/ISongInfo.interface';

export interface IPlayingSong {
  isPlaying: boolean;
  playingSongId: number;
  songList: ISongInfo[];
}
