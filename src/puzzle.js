import { Face, Edge, Vertex, W, S } from './coordinate_system'

export default class Puzzle {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.faces = []
    this.edges = []
    this.vertices = []
    this.generatePuzzle()
  }

  generatePuzzle() {
    const { width, height, faces, edges, vertices } = this

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
  }

  draw(ctx) {
    this.faces.forEach(f => f.draw(ctx))
    this.vertices.forEach(v => v.draw(ctx))
    this.edges.forEach(e => e.draw(ctx))
  }
}
