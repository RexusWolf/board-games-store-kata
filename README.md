## Goal

You have opened a new board games store, and you have a whole collection to organize in different shelves around the store.

The board games sorter is a tool used to organize your board games into shelves of custom size.

Given a collection of board games, you will build a piece of code that sorts them using different criterias.

> **You can never place a game that does not fit vertically or horizontally in the shelves**. For now, depth of the shelves will not be taken into account.

### Level 1

Sort all of the games following this criteria:

- All games will be **placed vertically**; that is, with their front cover facing the right side of the shelf.
- There will be no games covered by other games, so just one game even if another fits behind the one at the front.

### Level 2

Consider you can select the games **placement** to be vertical or horizontal. If you select horizontal, sort all of the games following this criteria:

- All games can be placed horizontally; that is, with their front cover looking at the top side of the shelf, and **rotated** to the front. If you were to pick up a game, you would see its cover correctly.
- There will be no games next to other games, just on top or under other games.

### Level 3

Consider you can **rotate** the games so their front cover is oriented to one of the sides of the shelves. Follow this criteria:

- All of the games must follow the same rules of placement and orientation.
- There will be no games next to (if placed horizontally) or behind other games (if placed vertically).

### Level 4

Consider you can **freely change placement and orientation for each game** so you can made the most of the space available.
