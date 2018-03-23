var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d")
var backgroundCanvas = document.getElementById("backgroundCanvas")
var backgroundCtx= backgroundCanvas.getContext("2d")

canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock    ||
                           document.mozExitPointerLock;


const HORIZONTAL = "HORIZONTAL"
const VERTICAL = "VERTICAL"
const MIDDLE = "MIDDLE"

let x = 25
let y = 215
let direction = HORIZONTAL
let middle = [230, 210]
let guyWidth = 1
let coords = [0,0];
let elbows = new Set()
let lastMouseCoords = [0,0];

function arrToStr(arr) {
  return `${arr[0]}#${arr[1]}`
}

function strToArr(str) {
  const els = str.split("#")
  return els.map(e => parseInt(e))
}

Set.prototype.addArray = function (arr) {
  const str = arrToStr(arr)
  this.add(str)
}

Set.prototype.hasArray = function (arr) {
  const str = arrToStr(arr)
  return this.has(str)
}

Set.prototype.deleteArray = function (arr) {
  const str = arrToStr(arr)
  this.delete(str)
}

Set.prototype.forEachArray = function (cb) {
  this.forEach(x => {
    cb(strToArr(x))
  })
}

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
    lastMouseCoords = [e.screenX, e.screenY]

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
    console.log('The pointer lock status is now locked');
    document.addEventListener("mousemove", mouseMoveHandler, false);
  } else {
    console.log('The pointer lock status is now unlocked');
    document.removeEventListener("mousemove", mouseMoveHandler, false);
  }
}

let lastElbow;
let insideVertex = false;

function mouseMoveHandler(e) {
  const dx = e.movementX
  const dy = e.movementY

  if (direction === MIDDLE) {
    if (Math.abs(dx) > Math.abs(dy)) {
      direction = HORIZONTAL
      // y = 215
     insideVertex = false
    } else {
      direction = VERTICAL
      // x = 215
     insideVertex = false
    }
    elbows.addArray(lastElbow)
  }

  if (direction === HORIZONTAL) {
    x += dx
  } else if (direction === VERTICAL) {
    y += dy
  } else {
    x += dx
    y += dy
  }
// this needs to be optimized
  vertices.forEach(v => {
    if (v.pointInSurroundingRegion(x,y) && !insideVertex) {
      insideVertex = true
      direction = MIDDLE

      if (elbows.hasArray([v.u, v.v])) {
        elbows.deleteArray([v.u, v.v])
      } else {
        lastElbow = [v.u, v.v]
      }
    }
  })

  // if (x >= 220 && x <= 240 && y >= 200 && y <= 220) {
  //   direction = MIDDLE
  // }

  lastMouseCoords = [e.screenX, e.screenY]
}

function drawGuy() {
  ctx.beginPath()
  ctx.arc(x, y, guyWidth, 0, Math.PI * 2)
  ctx.stroke()
}

function drawLine() {
  ctx.beginPath()
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.moveTo(25, 215)
  elbows.forEachArray(([x, y]) => ctx.lineTo(x ,y))
  ctx.lineTo(x,y)
  ctx.lineWidth = 15;
  ctx.stroke()
  ctx.lineWidth = 1;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGuy()
  drawLine()
}


const W = "W"
const S = "S"

class Face {
  constructor(u, v) {
    this.size = 200
    this.lineWidth = 60
    this.length = this.size - this.lineWidth/2
    this.u = u * this.size + this.lineWidth/2
    this.v = v * this.size + this.lineWidth/2
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.rect(this.u, this.v, this.length, this.length)
    ctx.stroke()
    ctx.closePath()
  }
}

class Vertex {
  constructor(u, v) {
    this.size = 200
    this.lineWidth = 60
    this.u = u * this.size + this.lineWidth/4
    this.v = v * this.size + this.size + this.lineWidth/4
  }

  pointInSurroundingRegion(u,v) {
    // console.log(`current: ${u},${v} vertex: ${this.u},${this.v}`);
    if (u > this.u - 15 && u < this.u + 15 && v > this.v - 15 && v < this.v + 15) {
      return true
    }
    return false
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.u, this.v, 10, 0, Math.PI * 2)
    ctx.stroke()
    ctx.closePath()
  }
}

class Edge {
  constructor(u, v, annotation) {
    this.size = 200
    this.lineWidth = 60
    this.length = this.size/10

    if (annotation === W) {
      this.u = u * this.size + this.lineWidth/13
      this.v = v * this.size + this.size/2
    } else if (annotation === S) {
      this.u = u * this.size + this.size/2
      this.v = v * this.size + this.size + this.lineWidth/13
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.rect(this.u, this.v, this.length, this.length)
    ctx.stroke()
    ctx.closePath()
  }
}

const faces = []
const vertices = []
const edges = []

function generatePuzzle(width, height) {

  for (var u = 0; u < width; u++) {
    for (var v = 0; v < height; v++) {
      faces.push(new Face(u, v))
      vertices.push(new Vertex(u, v))
      edges.push(new Edge(u, v, W))
      edges.push(new Edge(u, v, S))
    }
  }

  for (var u = 0; u < width; u++) {
    vertices.push(new Vertex(u, -1))
    edges.push(new Edge(u, -1, S))
  }

  for (var v = 0; v < height; v++) {
    vertices.push(new Vertex(width, v))
    edges.push(new Edge(width, v, W))
  }

  vertices.push(new Vertex(width, -1))

  faces.forEach(f => f.draw(backgroundCtx))
  vertices.forEach(v => v.draw(backgroundCtx))
  edges.forEach(e => e.draw(backgroundCtx))
}

generatePuzzle(3,3)
setInterval(draw, 10);
