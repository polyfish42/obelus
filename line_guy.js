var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d")


const HORIZONTAL = "HORIZONTAL"
const VERTICAL = "VERTICAL"
const MIDDLE = "MIDDLE"

let x = 20
let y = 210
let direction = HORIZONTAL
let middle = [230, 210]
let guyWidth = 1
let coords = [0,0];
let elbows = []
let lastMouseCoords = [0,0];

document.addEventListener("click", clickHandler, false)

function clickHandler(e) {
  lastMouseCoords = [e.screenX, e.screenY]
  document.addEventListener("mousemove", mouseMoveHandler, false);
}

function mouseMoveHandler(e) {
  const dx = lastMouseCoords[0] - e.screenX
  const dy = lastMouseCoords[1] - e.screenY

  if (direction === MIDDLE) {
    if (Math.abs(dx) > Math.abs(dy)) {
      direction = HORIZONTAL
      y = 210
      elbows = []
    } else {
      direction = VERTICAL
      x = 230
      elbows = [[230, 210]]
    }
  }

  if (direction === HORIZONTAL) {
    x -= dx
  } else if (direction === VERTICAL) {
    y -= dy
  } else {
    x -= dx
    y -= dy
  }

  // if (x === 230 && y === 210 && direction != MIDDLE) {
  //   direction = MIDDLE
  //   elbows.push([230, 210])
  // } else if (x < 230 && direction === MIDDLE) {
  //   direction = HORIZONTAL
  //   elbows = []
  // } else if (x === 230) {
  //   x = 230
  //   direction = VERTICAL
  // } else if (y === 210) {
  //   direction = HORIZONTAL
  // }

  if (x >= 220 && x <= 240 && y >= 200 && y <= 220) {
    direction = MIDDLE
  }

  lastMouseCoords = [e.screenX, e.screenY]
}

function drawGuy() {
  ctx.beginPath()
  ctx.arc(x, y, guyWidth, 0, Math.PI * 2)
  ctx.stroke()
}

function drawBoundaries() {
  ctx.beginPath()
  ctx.lineWidth = 1;
  ctx.rect(20, 0, 200, 200)
  ctx.stroke()
  ctx.beginPath()
  ctx.rect(240, 0, 200, 200)
  ctx.stroke()
  ctx.beginPath()
  ctx.rect(20, 220, 200, 200)
  ctx.stroke()
  ctx.beginPath()
  ctx.rect(240, 220, 200, 200)
  ctx.stroke()
}

function drawLine() {
  ctx.beginPath()
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.moveTo(20, 210)
  elbows.forEach(([x, y]) => ctx.lineTo(x ,y))
  ctx.lineTo(x,y)
  ctx.lineWidth = 15;
  ctx.stroke()
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGuy()
  drawBoundaries()
  drawLine()
}

setInterval(draw, 10);
