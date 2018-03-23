import Puzzle from './puzzle'
import Line from './line'

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d")
var backgroundCanvas = document.getElementById("backgroundCanvas")
var backgroundCtx= backgroundCanvas.getContext("2d")

canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock    ||
                           document.mozExitPointerLock;

const puzzle = new Puzzle(3,3)
const line = new Line(25, 215, puzzle.vertices)

document.addEventListener("click", clickHandler, false)

function clickHandler(e) {
  if (document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas) {
    document.exitPointerLock()
    x = 20
    y = 210
    elbows.clear()
  } else {
    canvas.requestPointerLock()
    // lastMouseCoords = [e.screenX, e.screenY]

    if ("onpointerlockchange" in document) {
      document.addEventListener('pointerlockchange', lockChangeAlert, false);
    } else if ("onmozpointerlockchange" in document) {
      document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
    }
  }
}

function lockChangeAlert() {
  if (document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas) {
    document.addEventListener("mousemove", mouseMoveHandler, false);
  } else {
    document.removeEventListener("mousemove", mouseMoveHandler, false);
  }
}

function mouseMoveHandler(e) {
  const du = e.movementX
  const dv = e.movementY

  line.update(du, dv)
}

function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    line.draw(ctx)
}

puzzle.draw(backgroundCtx)

setInterval(drawFrame, 10);
