# Obelus

[Play Game](http://jakebrady.me/obelus/)

## How to play
Solve puzzles by drawing lines from the start to the end. Different symbols in the puzzle have different rules for how the line can be drawn. Figure out what these symbols mean to solve each puzzle.

## Built With
HTML5 Canvas, CSS, JavaScript

## Line algorithm
The line in Obelus needed to be easy to draw, which meant more than taking a naive approach. The game intelligently guesses where you are trying to move the line, based on where you are on the board. For example, when you're closer to the left side of a horizontal line segment, moving up or down will move you to the left.

<p align="center">
  <img width="400px" height="196px" src="https://raw.githubusercontent.com/polyfish42/obelus/master/docs/Guessing.png">
</p>

The line can also be erased by "moving backwards". Crossing the line over itself, however, is not allowed.

<p align="center">
  <img width="400px" height="158px" src="https://raw.githubusercontent.com/polyfish42/obelus/master/docs/Boundaries.png">
 </p>

## Puzzle checking algorithm

## Todos
- [X] Implement Data structure for board
- [X] Create line UX
- [X] Add colored squares
- [X] Write algorithim to decide if the puzzle is solved
- [X] Implement game logic (start, end, etc)
- [X] Create the first 10 puzzles of increasing difficulty
- [X] Style the puzzle
- [ ] Add multiple starting points for puzzles
- [ ] Add more colors for square symbols
- [ ] Add start symbols
- [ ] Add tetris symbols
- [ ] Add diamond symbols
