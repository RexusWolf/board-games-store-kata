import { GameDoesNotFitError } from './errors/GameDoesNotFit';
import { GameDoesNotFitHorizontallyError } from './errors/GameDoesNotFitHorizontally';
import { GameDoesNotFitVerticallyError } from './errors/GameDoesNotFitVertically';
import { NotEnoughSpaceInShelves } from './errors/NotEnoughSpaceInShelves';
import { Game } from './Game';
import { ROTATION_TYPE } from './ROTATION_TYPE';
import { Shelf } from './Shelf';

export class BoardGamesSorter {
  constructor() {}

  orderGames = (params: {
    numberOfShelves: number;
    shelf: Shelf;
    games: Array<Game>;
    gamesPlacement: 'VERTICAL' | 'HORIZONTAL';
    rotationType: ROTATION_TYPE;
  }) => {
    const { numberOfShelves, shelf, games, gamesPlacement, rotationType } = params;

    const shelves: Array<Shelf> = this.initializeShelves(numberOfShelves, shelf);

    games.forEach((game) => this.addGameToShelves(shelf, game, shelves, gamesPlacement, rotationType));

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
    rotationType: ROTATION_TYPE
  ) {
    this.checkGameFitsInShelvesRotation(shelf, game, gamesPlacement, rotationType);
    this.checkGameFitsInShelves(shelf, game, gamesPlacement);

    const shelfFreeIndex = this.getFreeShelf(shelves, gamesPlacement, game);

    if (shelfFreeIndex === -1) {
      throw new NotEnoughSpaceInShelves();
    }

    shelves[shelfFreeIndex].gamesInShelf.push(game);
  }

  private checkGameFitsInShelves(shelf: Shelf, game: Game, gamesPlacement: string) {
    if (gamesPlacement === 'VERTICAL') {
      const gameFitsHorizontally = shelf.width >= game.depth;

      if (!gameFitsHorizontally) {
        throw new GameDoesNotFitHorizontallyError(game.name);
      }
    }

    if (gamesPlacement === 'HORIZONTAL') {
      const gameFitsVertically = shelf.height >= game.depth;

      if (!gameFitsVertically) {
        throw new GameDoesNotFitVerticallyError(game.name);
      }
    }
  }

  private checkGameFitsInShelvesRotation(
    shelf: Shelf,
    game: Game,
    gamesPlacement: string,
    rotationType: ROTATION_TYPE
  ) {
    const gameFitsVertically = rotationType === 'Rotated' ? shelf.height >= game.width : shelf.height >= game.height;

    const gameFitsHorizontally = rotationType === 'Rotated' ? shelf.width >= game.height : shelf.width >= game.width;

    if (rotationType !== 'Free_Rotation') {
      if (gamesPlacement === 'VERTICAL') {
        if (!gameFitsVertically) {
          throw new GameDoesNotFitVerticallyError(game.name);
        }
      }

      if (gamesPlacement === 'HORIZONTAL') {
        if (!gameFitsHorizontally) {
          throw new GameDoesNotFitHorizontallyError(game.name);
        }
      }
    }

    if (rotationType === 'Free_Rotation' && !gameFitsHorizontally && !gameFitsVertically) {
      throw new GameDoesNotFitError(game.name);
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
