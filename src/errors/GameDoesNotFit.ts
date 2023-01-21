export class GameDoesNotFitError extends Error {
  constructor(gameName: string) {
    super(`Game ${gameName} does not fit!`);
  }
}
