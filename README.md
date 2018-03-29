# Obelus

[Play Game](http://jakebrady.me/obelus/)

## How to play
Solve puzzles by drawing lines from the start to the end. Different symbols in the puzzle have different rules for how the line can be drawn. Figure out what these symbols mean to solve each puzzle.

## Built With
HTML5 Canvas, CSS, JavaScript

## Line algorithm
- maps user input to drawing the line
- guesses where users are trying to go
<p align="center">
  <img src="https://raw.githubusercontent.com/polyfish42/obelus/master/docs/Guessing.png">
</p>
- if your closer to one side, will favor that side
- can't cross over itself, but can erase itself

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
