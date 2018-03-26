import Puzzle from './puzzle'
import Line from './line'
import Cursor from './cursor'
import checkIfWon from './win_check'
import { N, W, BLACK_SQUARE, WHITE_SQUARE } from './coordinate_system'

let puzzleCtx;
let lineCtx;
let line;
let puzzle;
let cursor;

const sizeCanvases = (width, height) => {
  const puzzleCanvas = document.getElementById("puzzleCanvas")
  puzzleCanvas.setAttribute("style", `height:${height * 100 + 67.5}px; width: ${width * 100 + 67.5}px`)
  puzzleCanvas.setAttribute("height", `${height * 200 + 135}px`)
  puzzleCanvas.setAttribute("width", `${width * 200 + 135}px`)

  const lineCanvas = document.getElementById("lineCanvas")
  lineCanvas.setAttribute("style", `height:${height * 100 + 67.5}px; width: ${width * 100 + 67.5}px`)
  lineCanvas.setAttribute("height", `${height * 200 + 135}px`)
  lineCanvas.setAttribute("width", `${width * 200 + 135}px`)
}

const getCtx = (id) => {
  return document.getElementById(id).getContext("2d")
}

const makePuzzle = (start, end, height, width, squares) => {
  sizeCanvases(height, width)
  puzzleCtx = getCtx("puzzleCanvas")
  lineCtx = getCtx("lineCanvas")

  puzzle = new Puzzle(height, width)
  line = new Line(start[0], start[1], puzzle.vertices, puzzle.edges)
  cursor = new Cursor(lineCanvas,line)

  puzzle.setStart(...start)
  puzzle.setEnd(...end)

  squares.forEach(sq => puzzle.faces[sq[0]].inside = sq[1])
  puzzle.draw(puzzleCtx)
}

const drawFrame = () => {
    lineCtx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
    line.draw(lineCtx)
}

export const isGameWon = () => {
  if (line.atEnd === true) {
    checkIfWon(line, puzzle)
  } else {
    line.reset()
  }
}

makePuzzle([0,1],[1,1,N],1,2,[])

setInterval(drawFrame, 10);
