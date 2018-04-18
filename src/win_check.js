import {
  N,
  W,
  EMPTY,
  WHITE_SQUARE,
  BLACK_SQUARE
} from './coordinate_system'


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
  return [
    [u, v, N],
    [u, v, W],
    [u, v + 1, N],
    [u + 1, v, W]
  ]
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

const allSquaresWon = (line, puzzle) => {
  return Object.values(puzzle.faces).reduce((bool, face) => {
    let isFaceLegal;
    switch (face.inside) {
      case EMPTY:
        isFaceLegal = true
        break;
      case WHITE_SQUARE:
        isFaceLegal = checkSquare(face, line, puzzle, BLACK_SQUARE)
        break;
      case BLACK_SQUARE:
        isFaceLegal = checkSquare(face, line, puzzle, WHITE_SQUARE)
        break;
      default:
        isFaceLegal = bool
    }
    return bool === false ? false : isFaceLegal
  }, true)
}

const checkIfWon = (line, puzzle) => {
  if (line.atEnd === true && allSquaresWon(line, puzzle)) {
    return true
  } else {
    setTimeout(() => puzzle.clearErrors(), 1000);
    puzzle.reset();
    line.reset();
    return false
  }
}

export default checkIfWon;
