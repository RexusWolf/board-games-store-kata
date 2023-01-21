import { GAME_GENRES } from './GAME_GENRES';

export type Game = {
  name: string;
  genre: GAME_GENRES;
  width: number;
  height: number;
  depth: number;
  publisher: string;
};
