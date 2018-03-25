import Puzzle from './puzzle'
import Line from './line'
import Cursor from './cursor'
import { BLACK_SQUARE, WHITE_SQUARE } from './coordinate_system'

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d")
const backgroundCanvas = document.getElementById("backgroundCanvas")
const backgroundCtx= backgroundCanvas.getContext("2d")

const puzzle = new Puzzle(1,2)
const line = new Line(0, 1, puzzle.vertices, puzzle.edges)
const cursor = new Cursor(canvas,line)

function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    line.draw(ctx)
}

puzzle.faces[[0,0]].inside = WHITE_SQUARE
puzzle.faces[[0,1]].inside = BLACK_SQUARE
puzzle.draw(backgroundCtx)

setInterval(drawFrame, 10);
