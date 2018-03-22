const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d")
const W = "W"
const S = "S"

class Square {
  constructor(coords) {
    this.size = 200
    this.lineWidth = 60
    this.length = this.size - this.lineWidth/2
    this.x = coords[0] * this.size + this.lineWidth/2
    this.y = coords[1] * this.size + this.lineWidth/2
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.length, this.length)
    ctx.stroke()
    ctx.closePath()
  }
}

// const coords = [[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,0],[2,1],[2,2]]
//
// coords.forEach(coord => {
//   const s = new Square(coord)
//   s.draw(ctx)
// })

class Vertex {
  constructor(coord) {
    this.size = 200
    this.lineWidth = 60
    this.x = coord[0] * this.size + this.lineWidth/4
    this.y = coord[1] * this.size + this.lineWidth/4
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2)
    ctx.stroke()
    ctx.closePath()
  }
}

// const vertices = [[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,0],[2,1],[2,2],[0,3],[1,3],[2,3],[3,3],[3,0],[3,1],[3,2]]
//
// vertices.forEach(coord => {
//   const s = new Vertex(coord)
//   s.draw(ctx)
// })

class Edge {
  constructor(u, v, annotation) {
    this.size = 200
    this.lineWidth = 60
    this.length = this.size/10

    if (annotation === W) {
      this.u = u + this.lineWidth/13
      this.v = v * this.size + this.size/2
    } else if (annotation === S) {
      this.u = u * this.size + this.size/2
      this.v = v + this.size + this.lineWidth/13
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.rect(this.u, this.v, this.length, this.length)
    ctx.stroke()
    ctx.closePath()
  }
}


// const edges = [[0,0,W],[0,0,S]]
//
// edges.forEach(edge => {
//   const e = new Edge(...edge)
//   e.draw(ctx)
// })
