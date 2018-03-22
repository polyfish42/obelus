var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const lineWidth = 10
const squareWidth = 200

class Segment {
  constructor(ctx, type, coordinates) {
    this.ctx = ctx
    this.type = type
    this.x = coordinates[0]
    this.y = coordinates[1]
  }

  draw() {
    const {ctx, type, x, y} = this

    // if (type === "empty") {
    //   return null
    // }
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, Math.PI * 2)
    ctx.stroke()

    // ...
  }
}

class Square {
  constructor(ctx, type, coordinates) {
    this.ctx = ctx
    this.type = type
    this.x = coordinates[0]
    this.y = coordinates[1]
  }

  draw() {
    const {ctx, x, y} = this

    ctx.beginPath()
    ctx.lineWidth = 1;
    ctx.rect(x, y, squareWidth, squareWidth)
    ctx.stroke()
  }
}

class Graph {
  constructor() {
    this.adjList = new Map()
  }

  addVertex(v) {
    this.adjList.set(v, [])
  }

  addEdge(v, w) {
    if (this.adjList.has(v) && this.adjList.has(w)) {
      this.adjList.get(v).push(w)
      this.adjList.get(w).push(v)
    }
  }

  getAdjList() {
    return this.adjList
  }
}

function generatePuzzle() {
  graph = generateSquare(new Graph, [200,200])

  graph.getAdjList().forEach((value, key) => key.draw())
}

function generateSquare(graph, coordinates) {
  const square = new Square(ctx, "empty", coordinates)
  const topSegment = new Segment(ctx, "empty", topSegCoords(coordinates))
  const rightSegment = new Segment(ctx, "empty", rightSegCoords(coordinates))
  const bottomSegment = new Segment(ctx, "empty", bottomSegCoords(coordinates))
  const leftSegment = new Segment(ctx, "empty", leftSegCoords(coordinates))

  graph.addVertex(square)
  graph.addVertex(topSegment)
  graph.addVertex(rightSegment)
  graph.addVertex(bottomSegment)
  graph.addVertex(leftSegment)

  graph.addEdge(square, topSegment)
  graph.addEdge(square, rightSegment)
  graph.addEdge(square, bottomSegment)
  graph.addEdge(square, leftSegment)

  graph.addEdge(topSegment, leftSegment)
  graph.addEdge(topSegment, rightSegment)
  graph.addEdge(rightSegment, bottomSegment)
  graph.addEdge(bottomSegment, leftSegment)

  return graph
}

function topSegCoords(coordinates) {
  const [x, y] = coordinates

  return [x + squareWidth/2 , y - lineWidth]
}

function rightSegCoords(coordinates) {
  const [x, y] = coordinates

  return [x + squareWidth + lineWidth, y + squareWidth/2]
}

function bottomSegCoords(coordinates) {
  const [x, y] = coordinates

  return [x + squareWidth/2 , y + squareWidth + lineWidth]
}

function leftSegCoords(coordinates) {
  const [x, y] = coordinates

  return [x - lineWidth, y + squareWidth/2]
}

generatePuzzle()
