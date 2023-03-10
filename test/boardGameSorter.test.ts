import { Game } from '../src/Game';
import { Shelf } from '../src/Shelf';
import { BoardGamesSorter } from '../src/BoardGamesSorter';
import { GameBuilder } from './builders/GameBuilder';
import { GameDoesNotFitVerticallyError } from '../src/errors/GameDoesNotFitVertically';
import { GameDoesNotFitHorizontallyError } from '../src/errors/GameDoesNotFitHorizontally';
import { NotEnoughSpaceInShelves } from '../src/errors/NotEnoughSpaceInShelves';
import { GameDoesNotFitError } from '../src/errors/GameDoesNotFit';

describe('Board games store', () => {
  const shelf: Shelf = Shelf.emptyWithDimensions(380, 380);

  const gameWith380Depth = new GameBuilder().withName('380Game').withHeight(200).withWidth(200).withDepth(380).build();
  const gameWith190Depth = new GameBuilder()
    .withName('gameWith190Depth')
    .withHeight(200)
    .withWidth(200)
    .withDepth(190)
    .build();
  const secondGameWith190Depth = new GameBuilder()
    .withName('gameWith190Depth')
    .withHeight(200)
    .withWidth(300)
    .withDepth(190)
    .build();

  const rotationType = 'Not_Rotated';

  describe('games placement', () => {
    it('places the games vertically ', () => {
      const games = [gameWith380Depth, gameWith190Depth, secondGameWith190Depth];
      const numberOfShelves = 2;

      const gamesPlacement = 'VERTICAL';

      const boardGamesSorter = new BoardGamesSorter();

      const shelvesOrdered = boardGamesSorter.orderGames({
        numberOfShelves,
        shelf,
        games,
        gamesPlacement,
        rotationType,
      });

      expect(shelvesOrdered[0].gamesInShelf).toContain(gameWith380Depth);
      expect(shelvesOrdered[1].gamesInShelf).toContain(gameWith190Depth);
      expect(shelvesOrdered[1].gamesInShelf).toContain(gameWith190Depth);
    });

    it('places the games horizontally ', () => {
      const games = [gameWith380Depth, gameWith190Depth, secondGameWith190Depth];
      const numberOfShelves = 2;

      const gamesPlacement = 'HORIZONTAL';

      const boardGamesSorter = new BoardGamesSorter();

      const shelvesOrdered = boardGamesSorter.orderGames({
        numberOfShelves,
        shelf,
        games,
        gamesPlacement,
        rotationType,
      });

      expect(shelvesOrdered[0].gamesInShelf).toContain(gameWith380Depth);
      expect(shelvesOrdered[1].gamesInShelf).toContain(gameWith190Depth);
      expect(shelvesOrdered[1].gamesInShelf).toContain(gameWith190Depth);
    });

    it('places the games freely ', () => {
      const gameTooTall = new GameBuilder()
        .withName('gameTooTall')
        .withHeight(400)
        .withWidth(200)
        .withDepth(190)
        .build();
      const gameTooWide = new GameBuilder()
        .withName('gameTooWide')
        .withHeight(100)
        .withWidth(500)
        .withDepth(190)
        .build();

      const games = [gameTooTall, gameTooWide];
      const numberOfShelves = 1;

      const gamesPlacement = 'FREE';

      const boardGamesSorter = new BoardGamesSorter();

      const shelvesOrdered = boardGamesSorter.orderGames({
        numberOfShelves,
        shelf,
        games,
        gamesPlacement,
        rotationType,
      });

      expect(shelvesOrdered[0].gamesInShelf).toContain(gameTooTall);
      expect(shelvesOrdered[0].gamesInShelf).toContain(gameTooTall);
      expect(shelvesOrdered[0].gamesInShelfHorizontally).toContain(gameTooTall);
      expect(shelvesOrdered[0].gamesInShelfVertically).toContain(gameTooWide);
    });
  });

  describe('not enough space checks', () => {
    it('throws an error if a game is too tall for the shelf when ordeded vertically', () => {
      const games = [new GameBuilder().withDepth(200).withHeight(400).withWidth(200).build()];
      const numberOfShelves = 2;

      const gamesPlacement = 'VERTICAL';

      const boardGamesSorter = new BoardGamesSorter();

      expect(() =>
        boardGamesSorter.orderGames({ numberOfShelves, shelf, games, gamesPlacement, rotationType })
      ).toThrowError(GameDoesNotFitVerticallyError);
    });

    it('throws an error if a game is too wide for the shelf when ordeded horizontally', () => {
      const games = [new GameBuilder().withDepth(200).withHeight(200).withWidth(400).build()];
      const numberOfShelves = 2;

      const gamesPlacement = 'HORIZONTAL';

      const boardGamesSorter = new BoardGamesSorter();

      expect(() =>
        boardGamesSorter.orderGames({ numberOfShelves, shelf, games, gamesPlacement, rotationType })
      ).toThrowError(GameDoesNotFitHorizontallyError);
    });

    it('throws an error if there is no space for the games', () => {
      const games = [gameWith380Depth, gameWith380Depth, gameWith190Depth, secondGameWith190Depth];
      const numberOfShelves = 2;

      const gamesPlacement = 'HORIZONTAL';

      const boardGamesSorter = new BoardGamesSorter();

      expect(() =>
        boardGamesSorter.orderGames({ numberOfShelves, shelf, games, gamesPlacement, rotationType })
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
      const rotationType = 'Rotated';

      const boardGamesSorter = new BoardGamesSorter();

      expect(() =>
        boardGamesSorter.orderGames({ numberOfShelves, shelf, games, gamesPlacement, rotationType })
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
      const rotationType = 'Rotated';

      const boardGamesSorter = new BoardGamesSorter();

      expect(() =>
        boardGamesSorter.orderGames({ numberOfShelves, shelf, games, gamesPlacement, rotationType })
      ).toThrowError(GameDoesNotFitHorizontallyError);
    });

    it('throws error if game does not fit even when rotated 90 degrees and placed horizontally', () => {
      const notFittingRotatedGame = new GameBuilder()
        .withName('GameVeryWideWhenRotated')
        .withHeight(400)
        .withWidth(400)
        .withDepth(190)
        .build();

      const games = [notFittingRotatedGame];
      const numberOfShelves = 2;

      const gamesPlacement = 'HORIZONTAL';
      const rotationType = 'Free_Rotation';

      const boardGamesSorter = new BoardGamesSorter();

      expect(() =>
        boardGamesSorter.orderGames({ numberOfShelves, shelf, games, gamesPlacement, rotationType })
      ).toThrowError(GameDoesNotFitError);
    });

    it('throws error if game does not fit even when rotated 90 degrees and placed vertically', () => {
      const notFittingRotatedGame = new GameBuilder()
        .withName('GameVeryWideWhenRotated')
        .withHeight(400)
        .withWidth(400)
        .withDepth(190)
        .build();

      const games = [notFittingRotatedGame];
      const numberOfShelves = 2;

      const gamesPlacement = 'VERTICAL';
      const rotationType = 'Free_Rotation';

      const boardGamesSorter = new BoardGamesSorter();

      expect(() =>
        boardGamesSorter.orderGames({ numberOfShelves, shelf, games, gamesPlacement, rotationType })
      ).toThrowError(GameDoesNotFitError);
    });
  });
});
