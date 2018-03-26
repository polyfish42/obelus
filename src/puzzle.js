import { Face, Edge, Vertex, W, N, START, END, BLACK_SQUARE, WHITE_SQUARE, roundRect } from './coordinate_system'

const UP = "UP"
const DOWN = "DOWN"
const LEFT = "LEFT"
const RIGHT = "RIGHT"

export default class Puzzle {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.faces = {}
    this.edges = {}
    this.vertices = {}
    this.endNub = null
    this.endNubDirection = null
    this.generatePuzzle()
  }

  setStart(u, v) {
    this.vertices[[u, v]].type = START
  }

  setEnd(u,v, direction) {
    const end = this.edges[[u, v, direction]] = new Edge(u, v, direction)

    let vertex;
    if (direction === N && u === this.width) {
      vertex = this.vertices[[u + 1, v]] = new Vertex(u + 1, v)
      this.endNub = this.vertices[[u ,v]]
      this.endNubDirection = RIGHT
    } else if (direction === N) {
      vertex = this.vertices[[u,v]] = new Vertex(u, v)
      this.endNub = this.vertices[[u + 1, v]]
      this.endNubDirection = LEFT
    } else if (direction === W && v === this.height) {
      vertex = this.vertices[[u, v + 1]] = new Vertex(u, v + 1)
      this.endNub = this.vertices[[u ,v]]
      this.endNubDirection = DOWN
    } else if (direction === W) {
      vertex = this.vertices[[u, v]] = new Vertex(u, v)
      this.endNub = this.vertices[[u, v + 1]]
      this.endNubDirection = UP
    }

    end.type = END
    vertex.type = END
  }

  generatePuzzle() {
    const { width, height, faces, edges, vertices } = this

    for (var u = 0; u < width; u++) {
      for (var v = 0; v < height; v++) {
        faces[[u, v]] = new Face(u, v)
        vertices[[u, v]] = new Vertex(u, v)
        edges[[u, v, W]] = new Edge(u, v, W)
        edges[[u, v, N]] = new Edge(u, v, N)
      }
    }

    for (var u = 0; u < width; u++) {
      vertices[[u, v]] = new Vertex(u, v)
      edges[[u, height, N]] = new Edge(u, height, N)
    }

    for (var v = 0; v < height; v++) {
      vertices[[u, v]] = new Vertex(width, v)
      edges[[width, v , W]] = new Edge(width, v, W)
    }

    vertices[[width, height]] = new Vertex(width, height)
  }

  drawEndNub(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.endNub.u,this.endNub.v)
    switch (this.endNubDirection) {
      case UP:
        ctx.lineTo(this.endNub.u, this.endNub.v - 40)
        break;
      case RIGHT:
        ctx.lineTo(this.endNub.u + 40, this.endNub.v)
        break;
      case DOWN:
        ctx.lineTo(this.endNub.u, this.endNub.v + 40)
        break;
      case LEFT:
        ctx.lineTo(this.endNub.u - 40, this.endNub.v)
        break;
      default:
        ctx.closePath()
    }
    ctx.lineWidth = 30
    ctx.lineCap = "round"
    ctx.strokeStyle = "#0F0E6F"
    ctx.stroke()
    ctx.closePath()
  }

  draw(ctx) {
    ctx.beginPath()
    roundRect(ctx,50,50,this.width * 200 + 30,this.height * 200 + 30, 25)
    ctx.fillStyle = "#0F0E6F"
    ctx.fill()
    Object.values(this.faces).forEach(f => f.draw(ctx))
    this.drawEndNub(ctx)
    // Object.values(this.vertices).forEach(v => v.draw(ctx))
    // Object.values(this.edges).forEach(e => e.draw(ctx))
  }
}
