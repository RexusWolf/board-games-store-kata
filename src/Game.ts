import { GAME_GENRES } from './GAME_GENRES';

export class Game {
  name: string;
  genre: GAME_GENRES;
  width: number;
  height: number;
  depth: number;
  publisher: string;

  constructor(params: {
    name: string;
    genre: GAME_GENRES;
    width: number;
    height: number;
    depth: number;
    publisher: string;
  }) {
    this.name = params.name;
    this.genre = params.genre;
    this.width = params.width;
    this.height = params.height;
    this.depth = params.depth;
    this.publisher = params.publisher;
  }
}
