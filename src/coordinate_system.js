export const W = "W"
export const S = "S"

export class Face {
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

export class Edge {
  constructor(u, v, annotation) {
    this.size = 200
    this.lineWidth = 60
    this.length = this.size/10

    if (annotation === W) {
      this.direction = W
      this.endPoints = [[u, v + 1],[u, v]]
      this.u = u * this.size + this.lineWidth/13
      this.v = v * this.size + this.size/2
    } else if (annotation === S) {
      this.direction = S
      this.endPoints = [[u, v], [u + 1, v]]
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

export class Vertex {
  constructor(u, v) {
    this.size = 200
    this.lineWidth = 60
    this.protrudes = [[u,v,W], [u,v,S], [u,v-1,W],[u-1,v,S]]
    this.u = u * this.size + this.lineWidth/4
    this.v = v * this.size + this.lineWidth/4
  }

  pointInside(u,v) {
    if (u > this.u - 1 && u < this.u + 1 && v > this.v - 1 && v < this.v + 1) {
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
