export const W = "W"
export const N = "N"

export class Face {
  constructor(u, v) {
    this.size = 200
    this.lineWidth = 60
    this.length = this.size - this.lineWidth/2
    this.fillText = `${u}, ${v}`
    this.u = u * this.size + this.lineWidth/2
    this.v = v * this.size + this.lineWidth/2
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.rect(this.u, this.v, this.length, this.length)
    ctx.fillStyle = "#3A45CC"
    ctx.fill()
    // ctx.fillText(this.fillText, this.u + 100,this.v + 100)
    ctx.closePath()
  }
}

export class Edge {
  constructor(u, v, annotation) {
    this.size = 200
    this.lineWidth = 60
    this.length = this.size/10
    this.fillText = `${u},${v},${annotation}`

    if (annotation === W) {
      this.direction = W
      this.endPoints = [[u, v],[u, v + 1]]
      this.u = u * this.size + this.lineWidth/13
      this.v = v * this.size + this.size/2
    } else if (annotation === N) {
      this.direction = N
      this.endPoints = [[u, v], [u + 1, v]]
      this.u = u * this.size + this.size/2
      this.v = v * this.size + this.lineWidth/13
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.rect(this.u, this.v, this.length, this.length)
    ctx.font = "12px Arial"
    ctx.fillText(this.fillText, this.u, this.v)
    ctx.stroke()
    ctx.closePath()
  }
}

export class Vertex {
  constructor(u, v) {
    this.size = 200
    this.lineWidth = 60
    this.fillText = `${u},${v}`
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
    ctx.font = "12px Arial"
    ctx.fillText(this.fillText, this.u, this.v)
    ctx.stroke()
    ctx.closePath()
  }
}
