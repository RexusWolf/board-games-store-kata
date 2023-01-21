import { Game } from '../src/Game';
import { Shelf } from '../src/Shelf';
import { BoardGamesSorter } from '../src/BoardGamesSorter';
import { GameBuilder } from './builders/GameBuilder';
import { GameDoesNotFitVerticallyError } from '../src/errors/GameDoesNotFitVertically';
import { GameDoesNotFitHorizontallyError } from '../src/errors/GameDoesNotFitHorizontally';
import { NotEnoughSpaceInShelves } from '../src/errors/NotEnoughSpaceInShelves';

describe('Board games store', () => {
  const shelf: Shelf = new Shelf({
    width: 380,
    height: 380,
    gamesInShelf: [] as Array<Game>,
  });

  const gameWith380Depth = new GameBuilder().withName('380Game').withHeight(200).withWidth(200).withDepth(380).build();
  const gameWith400Height = new GameBuilder()
    .withName('gameWith190Depth')
    .withHeight(200)
    .withWidth(200)
    .withDepth(190)
    .build();
  const gameWith400Width = new GameBuilder()
    .withName('gameWith190Depth')
    .withHeight(200)
    .withWidth(300)
    .withDepth(190)
    .build();

  const gamesRotated90Degrees = false;

  describe('games placement', () => {
    it('orders the games vertically ', () => {
      const games = [gameWith380Depth, gameWith400Height, gameWith400Width];
      const numberOfShelves = 2;

      const gamesPlacement = 'VERTICAL';

      const boardGamesSorter = new BoardGamesSorter();

      const shelvesOrdered = boardGamesSorter.orderGames({
        numberOfShelves,
        shelf,
        games,
        gamesPlacement,
        gamesRotated90Degrees,
      });

      expect(shelvesOrdered[0].gamesInShelf).toContain(gameWith380Depth);
      expect(shelvesOrdered[1].gamesInShelf).toContain(gameWith400Height);
      expect(shelvesOrdered[1].gamesInShelf).toContain(gameWith400Height);
    });

    it('orders the games horizontally ', () => {
      const games = [gameWith380Depth, gameWith400Height, gameWith400Width];
      const numberOfShelves = 2;

      const gamesPlacement = 'HORIZONTAL';

      const boardGamesSorter = new BoardGamesSorter();

      const shelvesOrdered = boardGamesSorter.orderGames({
        numberOfShelves,
        shelf,
        games,
        gamesPlacement,
        gamesRotated90Degrees,
      });

      expect(shelvesOrdered[0].gamesInShelf).toContain(gameWith380Depth);
      expect(shelvesOrdered[1].gamesInShelf).toContain(gameWith400Height);
      expect(shelvesOrdered[1].gamesInShelf).toContain(gameWith400Height);
    });
  });

  describe('not enough space checks', () => {
    it('throws an error if a game is too tall for the shelf when ordeded vertically', () => {
      const games = [new GameBuilder().withHeight(400).withWidth(200).build()];
      const numberOfShelves = 2;

      const gamesPlacement = 'VERTICAL';

      const boardGamesSorter = new BoardGamesSorter();

      expect(() =>
        boardGamesSorter.orderGames({ numberOfShelves, shelf, games, gamesPlacement, gamesRotated90Degrees })
      ).toThrowError(GameDoesNotFitVerticallyError);
    });

    it('throws an error if a game is too wide for the shelf when ordeded horizontally', () => {
      const games = [new GameBuilder().withHeight(200).withWidth(400).build()];
      const numberOfShelves = 2;

      const gamesPlacement = 'HORIZONTAL';

      const boardGamesSorter = new BoardGamesSorter();

      expect(() =>
        boardGamesSorter.orderGames({ numberOfShelves, shelf, games, gamesPlacement, gamesRotated90Degrees })
      ).toThrowError(GameDoesNotFitHorizontallyError);
    });

    it('throws an error if there is no space for the games', () => {
      const games = [gameWith380Depth, gameWith380Depth, gameWith400Height, gameWith400Width];
      const numberOfShelves = 2;

      const gamesPlacement = 'HORIZONTAL';

      const boardGamesSorter = new BoardGamesSorter();

      expect(() =>
        boardGamesSorter.orderGames({ numberOfShelves, shelf, games, gamesPlacement, gamesRotated90Degrees })
      ).toThrowError(NotEnoughSpaceInShelves);
    });
  });

  describe('games rotation', () => {
    it('throws error if game does not fit when rotated 90 degrees and placed vertically', () => {
      const notFittingRotatedGame = new GameBuilder()
        .withName('GameVeryTallWhenRotated')
        .withHeight(200)
        .withWidth(400)
        .withDepth(190)
        .build();

      const games = [notFittingRotatedGame];
      const numberOfShelves = 2;

      const gamesPlacement = 'VERTICAL';
      const gamesRotated90Degrees = true;

      const boardGamesSorter = new BoardGamesSorter();

      expect(() =>
        boardGamesSorter.orderGames({ numberOfShelves, shelf, games, gamesPlacement, gamesRotated90Degrees })
      ).toThrowError(GameDoesNotFitVerticallyError);
    });

    it('throws error if game does not fit when rotated 90 degrees and placed horizontally', () => {
      const notFittingRotatedGame = new GameBuilder()
        .withName('GameVeryWideWhenRotated')
        .withHeight(400)
        .withWidth(200)
        .withDepth(190)
        .build();

      const games = [notFittingRotatedGame];
      const numberOfShelves = 2;

      const gamesPlacement = 'HORIZONTAL';
      const gamesRotated90Degrees = true;

      const boardGamesSorter = new BoardGamesSorter();

      expect(() =>
        boardGamesSorter.orderGames({ numberOfShelves, shelf, games, gamesPlacement, gamesRotated90Degrees })
      ).toThrowError(GameDoesNotFitHorizontallyError);
    });
  });
});
