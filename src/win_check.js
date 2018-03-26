import { N, W, EMPTY, WHITE_SQUARE, BLACK_SQUARE } from './coordinate_system'


Array.prototype.removeUndefined = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

const borders = (u, v) => {
  return [[u, v, N],
          [u, v, W],
          [u, v + 1, N],
          [u + 1, v, W]]
}

const adjacentSquares = (border, puzzle, sq) => {
  const [u, v, direction] = border
  let joins = []
  if (direction === N) {
    joins = [puzzle.faces[[u, v - 1]], puzzle.faces[[u, v]]]
  } else {
    joins = [puzzle.faces[[u - 1, v]], puzzle.faces[[u, v]]]
  }

  joins.removeUndefined()
  return joins
}

const checkSquare = (square, line, puzzle, oppositeColor) => {
  const checkedSquares = new Set()
  checkedSquares.add(square)
  const squares = [square]
  let sq;
  let allLegal = true

  while (squares.length > 0) {
    sq = squares.shift()

    borders(sq.initU, sq.initV).forEach(border => {
      if (puzzle.edges[border]) {
        if (puzzle.edges[border].lineThrough === false) {
          adjacentSquares(border, puzzle, sq).forEach(join => {
            if (!checkedSquares.has(join)) {
              if (join.inside === oppositeColor) {
                allLegal = false
              } else {
                checkedSquares.add(join)
                squares.push(join)
              }
            }
          })
        }
      }
    })
  }
  return allLegal
}

const allSquaresWon = (line, puzzle) => {
  return Object.values(puzzle.faces).reduce((bool, face) => {
    if (bool === false) {
      return false
    }

    switch (face.inside) {
      case EMPTY:
        return true
        break;
      case WHITE_SQUARE:
        return checkSquare(face, line, puzzle, BLACK_SQUARE)
      case BLACK_SQUARE:
        return checkSquare(face, line, puzzle, WHITE_SQUARE)
      default:
        return bool
    }
  }, true)
}

const checkIfWon = (line, puzzle) => {
  if (line.atEnd === true && allSquaresWon(line, puzzle)) {
    return true
  } else {
    line.reset()
    return false
  }
}

export default checkIfWon;

// check each direction. Is that edge on? then stop. else check that neighbor. Continue and keep track of tiles I've alread checked
