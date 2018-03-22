const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d")
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

function generatePuzzle(width, height) {
  const faces = []
  const vertices = []
  const edges = []

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

  faces.forEach(f => f.draw(ctx))
  vertices.forEach(v => v.draw(ctx))
  edges.forEach(e => e.draw(ctx))
}

generatePuzzle(3,3)
