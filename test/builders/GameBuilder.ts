import { faker } from '@faker-js/faker';
import { Game } from '../../src/Game';
import { GAME_GENRES } from '../../src/GAME_GENRES';

export class GameBuilder {
  private name: string;
  private genre: GAME_GENRES;
  private width: number;
  private height: number;
  private depth: number;
  private publisher: string;

  constructor() {
    this.name = faker.word.noun();
    this.genre = 'Strategy';
    this.width = faker.datatype.number({ min: 50, max: 500 });
    this.height = faker.datatype.number({ min: 50, max: 500 });
    this.depth = faker.datatype.number({ min: 50, max: 500 });
    this.publisher = faker.company.name();
  }

  build() {
    return new Game({
      name: this.name,
      width: this.width,
      height: this.height,
      depth: this.depth,
      genre: this.genre,
      publisher: this.publisher,
    });
  }

  withName(name: string) {
    this.name = name;
    return this;
  }

  withWidth(width: number) {
    this.width = width;
    return this;
  }

  withHeight(height: number) {
    this.height = height;
    return this;
  }

  withDepth(depth: number) {
    this.depth = depth;
    return this;
  }
}
