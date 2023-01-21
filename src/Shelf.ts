import { Game } from './Game';

export class Shelf {
  width: number;
  height: number;
  gamesInShelf: Array<Game>;

  constructor(params: { width: number; height: number; gamesInShelf: Array<Game> }) {
    this.width = params.width;
    this.height = params.height;
    this.gamesInShelf = params.gamesInShelf;
  }

  static emptyWithDimensions(width: number, height: number) {
    return new Shelf({
      width,
      height,
      gamesInShelf: [] as Array<Game>,
    });
  }

  availableSpaceHorizontally() {
    const horizontalSpaceOccupied = this.gamesInShelf.reduce((a, b) => a + b.depth, 0);
    return this.width - horizontalSpaceOccupied;
  }

  availableSpaceVertically() {
    const verticalSpaceOccupied = this.gamesInShelf.reduce((a, b) => a + b.depth, 0);
    return this.height - verticalSpaceOccupied;
  }
}
