export class NotEnoughSpaceInShelves extends Error {
  constructor() {
    super(`There is not enough space in shelves for the games!`);
  }
}
