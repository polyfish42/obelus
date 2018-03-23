import * as ArraySet from './util/array_set'

const HORIZONTAL = "HORIZONTAL"
const VERTICAL = "VERTICAL"
const MIDDLE = "MIDDLE"

export default class Line {
  constructor(endU, endV, vertices) {
    this.endU = endU
    this.endV = endV
    this.vertices = vertices
    this.direction = HORIZONTAL
    this.endWidth = 1
    this.elbows = new Set()
    this.lastElbow = null
    this.insideVertex = false
  }

  update(du, dv) {
    const {elbows, vertices} = this

    if (this.direction === MIDDLE) {
      if (Math.abs(du) > Math.abs(dv)) {
        this.direction = HORIZONTAL
        this.insideVertex = false
      } else {
        this.direction = VERTICAL
        this.insideVertex = false
      }
      this.elbows.addArray(this.lastElbow)
    }

    if (this.direction === HORIZONTAL) {
      this.endU += du
    } else if (this.direction === VERTICAL) {
      this.endV += dv
    } else {
      this.endU += du
      this.endV += dv
    }

    // TODO optimize for speed
    vertices.forEach(v => {
      if (v.pointInSurroundingRegion(this.endU, this.endV) && !this.insideVertex) {
        this.insideVertex = true
        this.direction = MIDDLE

        if (elbows.hasArray([v.u, v.v])) {
          elbows.deleteArray([v.u, v.v])
        } else {
          this.lastElbow = [v.u, v.v]
        }
      }
    })
  }

  drawEnd(ctx) {
    const { endU, endV, endWidth } = this

    ctx.beginPath()
    ctx.arc(endU, endV, endWidth, 0, Math.PI * 2)
    ctx.stroke()
  }

  draw(ctx) {
    const { endU, endV, elbows} = this
    ctx.beginPath()
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.moveTo(25, 215)
    elbows.forEachArray(([u,v]) => ctx.lineTo(u,v))
    ctx.lineTo(endU,endV)
    ctx.lineWidth = 15;
    ctx.stroke()
    ctx.lineWidth = 1;
    this.drawEnd(ctx)
  }
}
