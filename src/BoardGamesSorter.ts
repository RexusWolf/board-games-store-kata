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
    gamesPlacement: 'VERTICAL' | 'HORIZONTAL';
    gamesRotated90Degrees: boolean;
  }) => {
    const { numberOfShelves, shelf, games, gamesPlacement, gamesRotated90Degrees } = params;

    const shelves: Array<Shelf> = this.initializeShelves(numberOfShelves, shelf);

    games.forEach((game) => this.addGameToShelves(shelf, game, shelves, gamesPlacement, gamesRotated90Degrees));

    return shelves;
  };

  private initializeShelves(numberOfShelves: number, shelf: Shelf): Shelf[] {
    return new Array(numberOfShelves).fill(0).map(() => Shelf.emptyWithDimensions(shelf.width, shelf.height));
  }

  private addGameToShelves(
    shelf: Shelf,
    game: Game,
    shelves: Shelf[],
    gamesPlacement: string,
    gamesRotated90Degrees: boolean
  ) {
    this.checkGameFitsInShelves(shelf, game, gamesPlacement, gamesRotated90Degrees);

    const shelfFreeIndex = this.getFreeShelf(shelves, gamesPlacement, game);

    if (shelfFreeIndex === -1) {
      throw new NotEnoughSpaceInShelves();
    }

    shelves[shelfFreeIndex].gamesInShelf.push(game);
  }

  private checkGameFitsInShelves(shelf: Shelf, game: Game, gamesPlacement: string, gamesRotated90Degrees: boolean) {
    if (gamesPlacement === 'VERTICAL') {
      const gameFitsVertically = gamesRotated90Degrees ? shelf.height >= game.width : shelf.height >= game.height;
      const gameFitsHorizontally = shelf.width >= game.depth;

      if (!gameFitsVertically) {
        throw new GameDoesNotFitVerticallyError(game.name);
      }

      if (!gameFitsHorizontally) {
        throw new GameDoesNotFitHorizontallyError(game.name);
      }
    }

    if (gamesPlacement === 'HORIZONTAL') {
      const gameFitsVertically = shelf.height >= game.depth;
      const gameFitsHorizontally = gamesRotated90Degrees ? shelf.width >= game.height : shelf.width >= game.width;

      if (!gameFitsVertically) {
        throw new GameDoesNotFitVerticallyError(game.name);
      }

      if (!gameFitsHorizontally) {
        throw new GameDoesNotFitHorizontallyError(game.name);
      }
    }
  }

  private getFreeShelf(shelves: Shelf[], gamesPlacement: string, game: Game) {
    return shelves.findIndex((shelf) => {
      if (gamesPlacement === 'VERTICAL') {
        return shelf.availableSpaceHorizontally() >= game.depth;
      }

      if (gamesPlacement === 'HORIZONTAL') {
        return shelf.availableSpaceVertically() >= game.depth;
      }
    });
  }
}
