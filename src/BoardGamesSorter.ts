import { GameDoesNotFitHorizontallyError } from './errors/GameDoesNotFitHorizontally';
import { GameDoesNotFitVerticallyError } from './errors/GameDoesNotFitVertically';
import { NotEnoughSpaceInShelves } from './errors/NotEnoughSpaceInShelves';
import { Game } from './Game';
import { Shelf } from './Shelf';

export class BoardGamesSorter {
  constructor() {}

  orderGames = (params: {
    numberOfShelves: number;
    shelf: Shelf;
    games: Array<Game>;
    gamesOrientation: 'VERTICAL' | 'HORIZONTAL';
  }) => {
    const { numberOfShelves, shelf, games, gamesOrientation } = params;

    const shelves: Array<Shelf> = this.initializeShelves(numberOfShelves, shelf);

    games.forEach((game) => this.addGameToShelves(shelf, game, shelves, gamesOrientation));

    return shelves;
  };

  private initializeShelves(numberOfShelves: number, shelf: Shelf): Shelf[] {
    return new Array(numberOfShelves).fill(0).map(() => Shelf.emptyWithDimensions(shelf.width, shelf.height));
  }

  private addGameToShelves(shelf: Shelf, game: Game, shelves: Shelf[], gamesOrientation: string) {
    this.checkGameFitsInShelves(shelf, game);

    const shelfFreeIndex = this.getFreeShelf(shelves, gamesOrientation, game);

    if (shelfFreeIndex === -1) {
      throw new NotEnoughSpaceInShelves();
    }

    shelves[shelfFreeIndex].gamesInShelf.push(game);
  }

  private checkGameFitsInShelves(shelf: Shelf, game: Game) {
    const gameFitsVertically = shelf.height >= game.height;

    if (!gameFitsVertically) {
      throw new GameDoesNotFitVerticallyError(game.name);
    }
    const gameFitsHorizontally = shelf.width >= game.width;

    if (!gameFitsHorizontally) {
      throw new GameDoesNotFitHorizontallyError(game.name);
    }
  }

  private getFreeShelf(shelves: Shelf[], gamesOrientation: string, game: Game) {
    return shelves.findIndex((shelf) => {
      if (gamesOrientation === 'VERTICAL') {
        return shelf.availableSpaceHorizontally() >= game.depth;
      }

      if (gamesOrientation === 'HORIZONTAL') {
        return shelf.availableSpaceVertically() >= game.depth;
      }
    });
  }
}