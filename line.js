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
  const dy = lastMouseCoords[1] - e.screenY
  lastMouseCoords = [e.screenX, e.screenY]
  addLineSegment(dx, dy)
}

function addLineSegment(dx, dy) {
  let last = lineSegments[segmentIndex - 1]
  let x1 = last[0]
  let y1 = last[1]
  let newSegment = [x1 - dx, y1 - dy]

  if (dx > 0) {
    for (var i = 0; i < dx - 1; i++) {
      segmentIndex--
    }
  } else if (dx < 0 && notInBoxBounds(x1 - dx, y1 - dy)) {
    for (var i = dx; i < 0; i++) {
      lineSegments[segmentIndex++] = [x1 - dx, y1 - dy]
    }
  }
}

function drawLine() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    // let x1 = lineSegments[0][0]
    // let y1 = lineSegments[0][1]
    // let x2 = lineSegments[segmentIndex - 1][0]
    // let y2 = lineSegments[segmentIndex - 1][1]

    // ctx.beginPath()
    // ctx.moveTo(x1, y1)
    // ctx.lineWidth = 15;
    // ctx.lineTo(x2, y2)
    // ctx.stroke()

    let x1 = lineSegments[0][0]
    let y1 = lineSegments[0][1]

    for (var i = 0; i < segmentIndex - 1; i++) {
      let x2 = lineSegments[i + 1][0] || x1
      let y2 = lineSegments[i + 1][1] || y1

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineWidth = 15;
      ctx.lineTo(x2, y2)
      ctx.stroke()

      x1 = lineSegments[i + 1][0]
      y1 = lineSegments[i + 1][1]
    }
}

function drawBox() {
  ctx.beginPath()
  ctx.rect(20, 35, 200, 200)
  ctx.stroke()
}

function notInBoxBounds(x, y) {
  if (x < 220 && x > 20 && y > 35 && y < 235) {
    return false
  } else {
    return true
  }
}

function draw() {
  drawLine()
  drawBox()
}

setInterval(draw, 1)
