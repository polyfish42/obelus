# Obelus

Obelus is a line puzzle game inspired by [The Witness](http://the-witness.net).

[Play Game](http://jakebrady.me/obelus/)

## How to play
Solve puzzles by drawing lines from the start to the end of the board. Different symbols in the puzzle have different rules for how the line can be drawn. Figure out what these symbols mean to solve each puzzle.

## Built With
HTML5 Canvas, CSS, JavaScript

## Line algorithm
The line in Obelus needed to be easy to draw, which meant that the mouse input should be as forgiving as possible. The line algorithm intelligently guesses where you are trying to move based on where you are on the board. For example, when you're closer to the left side of a horizontal line segment, moving the cursor up or down will move you to the left.

<p align="center">
  <img width="400px" height="196px" src="https://raw.githubusercontent.com/polyfish42/obelus/master/docs/Guessing.png">
</p>

```javascript
if (closestVertex === startVertex) {
          if (direction === UP || direction === LEFT || direction === DOWN) {
            if (this.blockLeftUp === true && magnitude > distanceFromStart - 30) {
              this.endU -= distanceFromStart - 30
              break
            } else if (distanceFromStart > magnitude) {
              this.endU -= magnitude
              break
            } else {
              magnitude -= distanceFromStart
              this.endU -= distanceFromStart
            }
          } else {
            if (distanceFromEnd > magnitude) {
              this.endU += magnitude
              break
            } else {
              magnitude -= distanceFromEnd
              this.endU += distanceFromEnd
            }
          }
        } 
```

The line can also be erased by "moving backwards". Crossing the line over itself, however, is not allowed.

<p align="center">
  <img width="400px" height="158px" src="https://raw.githubusercontent.com/polyfish42/obelus/master/docs/Boundaries.png">
</p>

## Puzzle checking algorithm

To check if a gamer has solved a puzzle, I used a variation of the **breadth first search** algorithm. The algorithm checks each square's boundaries to see if there is a line next to it. If there's not, it will check the adjacent square to see if it violates any of the original square's rules. The algorithm continues in this fashion until it has checked all neighbors of a square or it has hit lines and edges of the puzzle in every direction.

<p align="center">
  <img width="200px" height="200px" src="https://raw.githubusercontent.com/polyfish42/obelus/master/docs/checking%20algorithm.png" />
</p>

```javascript
const checkSquare = (square, line, puzzle, oppositeColor) => {
  const checkedSquares = new Set()
  checkedSquares.add(square)
  const squares = [square]
  let sq;
  let allLegal = true

  while (squares.length > 0) {
    sq = squares.shift()

    borders(sq.initU, sq.initV).forEach(border => {
      if (puzzle.edges[border] && puzzle.edges[border].lineThrough === false) {
          adjacentSquares(border, puzzle, sq).forEach(join => {
            if (join.inside === oppositeColor) {
              allLegal = false
              join.setError()
            }
            if (!checkedSquares.has(join)) {
            checkedSquares.add(join)
            squares.push(join)
            }
          })
        }
    })
  }
  return allLegal
}
```

Although it would be possible to stop the execution of the algorithm early if it found a square that was illegal, the algorithm still checks each square so that the game can show the users every square that was illegal.

## Todos
- [X] Implement Data structure for board
- [X] Create line UX
- [X] Add colored squares
- [X] Write algorithm to decide if the puzzle is solved
- [X] Implement game logic (start, end, etc)
- [X] Create the first 10 puzzles of increasing difficulty
- [X] Style the puzzle
- [ ] Add multiple starting points for puzzles
- [ ] Add more colors for square symbols
- [ ] Add start symbols
- [ ] Add tetris symbols
- [ ] Add diamond symbols
