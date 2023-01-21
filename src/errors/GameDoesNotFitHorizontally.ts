export class GameDoesNotFitHorizontallyError extends Error {
  constructor(gameName: string) {
    super(`Game ${gameName} does not fit horizontally!`);
  }
}
