import { Face, Edge, Vertex, W, N, START, END, BLACK_SQUARE, WHITE_SQUARE } from './coordinate_system'

export default class Puzzle {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.faces = {}
    this.edges = {}
    this.vertices = {}
    this.generatePuzzle()
  }

  setStart(coord) {
    this.vertices[coord].type = START
  }

  setEnd(u,v, direction) {
    const end = this.edges[[u, v, direction]] = new Edge(u, v, direction)

    let vertex;
    if (direction === N && u === this.width) {
      vertex = this.vertices[[u + 1, v]] = new Vertex(u + 1, v)
    } else if (direction === N) {
      vertex = this.vertices[[u,v]] = new Vertex(u, v)
    } else if (direction === W && v === this.height) {
      vertex = this.vertices[[u, v + 1]] = new Vertex(u, v + 1)
    } else if (direction === W) {
      vertex = this.vertices[[u, v]] = new Vertex(u, v)
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

  draw(ctx) {
    Object.values(this.faces).forEach(f => f.draw(ctx))
    // Object.values(this.vertices).forEach(v => v.draw(ctx))
    // Object.values(this.edges).forEach(e => e.draw(ctx))
  }
}
