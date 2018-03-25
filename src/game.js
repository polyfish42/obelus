import Puzzle from './puzzle'
import Line from './line'
import Cursor from './cursor'

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d")
const backgroundCanvas = document.getElementById("backgroundCanvas")
const backgroundCtx= backgroundCanvas.getContext("2d")

const puzzle = new Puzzle(5,5)
const line = new Line(15, 15, puzzle.vertices, puzzle.edges)
const cursor = new Cursor(canvas,line)

function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    line.draw(ctx)
}

puzzle.draw(backgroundCtx)

setInterval(drawFrame, 10);
