import * as ArraySet from './util/array_set'

const HORIZONTAL = "HORIZONTAL"
const VERTICAL = "VERTICAL"
const MIDDLE = "MIDDLE"
const NOT_IN_VERTEX = "NOT_IN_VERTEX"

export default class Line {
  constructor(u, v, vertices) {
    this.startU = u
    this.startV = v
    this.endU = u
    this.endV = v
    this.vertices = vertices
    this.direction = HORIZONTAL
    this.endWidth = 1
    this.elbows = new Set()
    this.endVertex = NOT_IN_VERTEX
  }

  update(du, dv) {
    const {elbows, vertices} = this

    // if (this.direction === MIDDLE) {
    //   if (Math.abs(du) > Math.abs(dv)) {
    //     this.direction = HORIZONTAL
    //   } else {
    //     this.direction = VERTICAL
    //   }
    // }

    if (this.direction === HORIZONTAL) {
      this.endU += du
    } else if (this.direction === VERTICAL) {
      this.endV += dv
    } else {
      this.endU += du
      this.endV += dv
    }

    this.checkIfInVertex()
  }

  checkIfInVertex() {
    const { vertices, elbows } = this

    if (this.endVertex === NOT_IN_VERTEX) {
      vertices.forEach(vertex => {
        if (vertex.pointInside(this.endU, this.endV)) {
          if (elbows.has(vertex)) {
            elbows.delete(vertex)
            this.endVertex = vertex
          } else {
            this.endVertex = vertex
            elbows.add(this.endVertex)
          }
        }
      })
    } else if (!this.endVertex.pointInside(this.endU, this.endV)) {
      this.endVertex = NOT_IN_VERTEX
    }
  }

  reset() {
    this.elbows.clear()
    this.endU = this.startU
    this.endV = this.startV
  }

  drawEnd(ctx) {
    const { endU, endV, endWidth } = this

    ctx.beginPath()
    ctx.arc(endU, endV, endWidth, 0, Math.PI * 2)
    ctx.stroke()
  }

  draw(ctx) {
    const { startU, startV, endU, endV, elbows} = this
    ctx.beginPath()
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.moveTo(startU, startV)
    elbows.forEach(e => ctx.lineTo(e.u,e.v))
    ctx.lineTo(endU,endV)
    ctx.lineWidth = 15;
    ctx.stroke()
    ctx.lineWidth = 1;
    this.drawEnd(ctx)
  }
}
