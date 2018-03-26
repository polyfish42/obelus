import Puzzle from './puzzle'
import Line from './line'
import Cursor from './cursor'
import checkIfWon from './win_check'
import { N, W, BLACK_SQUARE, WHITE_SQUARE } from './coordinate_system'

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d")
const backgroundCanvas = document.getElementById("backgroundCanvas")
const backgroundCtx= backgroundCanvas.getContext("2d")

const puzzle = new Puzzle(3,3)
const line = new Line(0, 3, puzzle.vertices, puzzle.edges)
const cursor = new Cursor(canvas,line)


const drawFrame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    line.draw(ctx)
}

export const isGameWon = () => {
  if (line.atEnd === true) {
    checkIfWon(line, puzzle)
  } else {
    line.reset()
  }
}

puzzle.setStart([0,3])
puzzle.setEnd(-1,2,N)
puzzle.faces[[0,0]].inside = BLACK_SQUARE
puzzle.faces[[1,0]].inside = BLACK_SQUARE
puzzle.faces[[2,0]].inside = BLACK_SQUARE
puzzle.faces[[0,1]].inside = BLACK_SQUARE
puzzle.faces[[2,1]].inside = BLACK_SQUARE
puzzle.faces[[1,1]].inside = WHITE_SQUARE
puzzle.faces[[0,2]].inside = WHITE_SQUARE
puzzle.faces[[1,2]].inside = WHITE_SQUARE
puzzle.faces[[2,2]].inside = WHITE_SQUARE
puzzle.draw(backgroundCtx)

setInterval(drawFrame, 10);
