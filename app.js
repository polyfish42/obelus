class LineCell {
  constructor(prevCell, nextCell, adjecentCells) {
    this.prevCell = prevCell
    this.nextCell = nextCell
    this.adjecentCells = adjecentCells
    this.lineThrough = false
  }

  lineRetreat () {
    this.lineThrough = false
    return this.prevCell
  }

  lineThrough () {
    this.lineThrough = true
  }

  lineNext () {
    return this.nextCell
  }
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


let a = 0
let b = 0
let coords = [0,0];
let initialCoords = [0,0];

document.addEventListener("click", clickHandler, false)

function clickHandler(e) {
  initialCoords = [e.screenX, e.screenY]

  console.log(initialCoords);

  document.addEventListener("mousemove", mouseMoveHandler, false);
}

function mouseMoveHandler(e) {
  coords = [e.screenX, e.screenY]

  console.log(coords);
}

function drawLine() {
    ctx.beginPath();
    ctx.moveTo(0,0)
    ctx.lineWidth = 15;
    ctx.lineTo(a, b)
    ctx.strokeStyle= "black";
    ctx.stroke()
}

function drawBoundaries() {
  ctx.beginPath()
  ctx.moveTo(100, 85)
  ctx.lineTo(900,85)
  ctx.strokeStyle="#FF0000";
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(100, 115)
  ctx.lineTo(900,115)
  ctx.stroke()
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLine();
    drawBoundaries()

    a = Math.abs(initialCoords[0] - coords[0] + coords[1])
}

// function generateLineCells() {
//   const lineA = new LineCell(null, null)
//   const lineB = new LineCell(lineA, [lineA])
//   lineA.link(lineB)
//
//   return [lineA, lineB]
// }
//
// function drawLineCells() {
//   generateLineCells().forEach(cell, => {
//     drawLineCell(cell)
//   })
// }
//
// function drawLineCell() {
//
// }

setInterval(draw, 10);
