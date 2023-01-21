export class GameDoesNotFitVerticallyError extends Error {
  constructor(gameName: string) {
    super(`Game ${gameName} does not fit vertically!`);
  }
}
