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
  const firstGameWith190Depth = new GameBuilder()
    .withName('First190Game')
    .withHeight(200)
    .withWidth(200)
    .withDepth(190)
    .build();
  const secondGameWith190Depth = new GameBuilder()
    .withName('Second190Game')
    .withHeight(200)
    .withWidth(200)
    .withDepth(190)
    .build();

  it('orders the games vertically ', () => {
    const games = [gameWith380Depth, firstGameWith190Depth, secondGameWith190Depth];
    const numberOfShelves = 2;

    const gamesOrientation = 'VERTICAL';

    const boardGamesSorter = new BoardGamesSorter();

    const shelvesOrdered = boardGamesSorter.orderGames({ numberOfShelves, shelf, games, gamesOrientation });

    expect(shelvesOrdered[0].gamesInShelf).toContain(gameWith380Depth);
    expect(shelvesOrdered[1].gamesInShelf).toContain(firstGameWith190Depth);
    expect(shelvesOrdered[1].gamesInShelf).toContain(firstGameWith190Depth);
  });

  it('orders the games horizontally ', () => {
    const games = [gameWith380Depth, firstGameWith190Depth, secondGameWith190Depth];
    const numberOfShelves = 2;

    const gamesOrientation = 'HORIZONTAL';

    const boardGamesSorter = new BoardGamesSorter();

    const shelvesOrdered = boardGamesSorter.orderGames({ numberOfShelves, shelf, games, gamesOrientation });

    expect(shelvesOrdered[0].gamesInShelf).toContain(gameWith380Depth);
    expect(shelvesOrdered[1].gamesInShelf).toContain(firstGameWith190Depth);
    expect(shelvesOrdered[1].gamesInShelf).toContain(firstGameWith190Depth);
  });

  it('throws an error if a game does not fit vertically', () => {
    const games = [new GameBuilder().withHeight(400).withWidth(200).build()];
    const numberOfShelves = 2;

    const gamesOrientation = 'HORIZONTAL';

    const boardGamesSorter = new BoardGamesSorter();

    expect(() => boardGamesSorter.orderGames({ numberOfShelves, shelf, games, gamesOrientation })).toThrowError(
      GameDoesNotFitVerticallyError
    );
  });

  it('throws an error if a game does not fit vertically', () => {
    const games = [new GameBuilder().withHeight(200).withWidth(400).build()];
    const numberOfShelves = 2;

    const gamesOrientation = 'HORIZONTAL';

    const boardGamesSorter = new BoardGamesSorter();

    expect(() => boardGamesSorter.orderGames({ numberOfShelves, shelf, games, gamesOrientation })).toThrowError(
      GameDoesNotFitHorizontallyError
    );
  });

  it('throws an error if there is no space for the games', () => {
    const games = [gameWith380Depth, gameWith380Depth, firstGameWith190Depth, secondGameWith190Depth];
    const numberOfShelves = 2;

    const gamesOrientation = 'HORIZONTAL';

    const boardGamesSorter = new BoardGamesSorter();

    expect(() => boardGamesSorter.orderGames({ numberOfShelves, shelf, games, gamesOrientation })).toThrowError(
      NotEnoughSpaceInShelves
    );
  });
});
