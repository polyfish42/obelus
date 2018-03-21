var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


let x = 300
let y = 300
let lineSegments = new Array(1000)
let segmentIndex = 0
lineSegments[segmentIndex++] = [20,20]

let lastMouseCoords;

document.addEventListener("click", clickHandler, false)

function clickHandler(e) {
  lastMouseCoords = [e.screenX, e.screenY]
  document.addEventListener("mousemove", mouseMoveHandler, false);
}

function mouseMoveHandler(e) {
  const dx = lastMouseCoords[0] - e.screenX
  // const dy = lastMouseCoords[1] - e.screenY
  lastMouseCoords = [e.screenX, e.screenY]
  addLineSegment(dx)
}

function addLineSegment(dx, dy) {
  let last = lineSegments[segmentIndex - 1]
  let x1 = last[0]
  let y1 = last[1]
  lineSegments[segmentIndex++] = [x1 - dx, y1]
}

function drawLine() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    let x1 = lineSegments[0][0]
    let y1 = lineSegments[0][1]
    let x2 = lineSegments[segmentIndex - 1][0]
    let y2 = lineSegments[segmentIndex - 1][1]

    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineWidth = 15;
    ctx.lineTo(x2, y2)
    ctx.stroke()

}

function drawBox() {
  
}

function draw() {
  drawLine()
  drawBox()
}

setInterval(draw, 10)
