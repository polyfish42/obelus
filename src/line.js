import { W, N, Edge } from './coordinate_system'

const HORIZONTAL = "HORIZONTAL"
const VERTICAL = "VERTICAL"
const MIDDLE = "MIDDLE"
const UP = "UP"
const RIGHT = "RIGHT"
const DOWN = "DOWN"
const LEFT = "LEFT"
const NOT_IN_VERTEX = "NOT_IN_VERTEX"

export default class Line {
  constructor(u, v, vertices, edges) {
    this.startU = u
    this.startV = v
    this.endU = u
    this.endV = v
    this.vertices = vertices
    this.edges = edges
    this.onEdge = new Edge(0, 0, N)
    this.startVertex = vertices[[0,0]]
    this.endVertex = vertices[[1,0]]
    this.blockLeftUp = false
    this.blockRightDown = false
    // this.direction = HORIZONTAL
    this.endWidth = 10
    this.elbows = new Set()
  }

  update(du, dv) {
    if (du === 0 && dv === 0) {
      return null
    }

    const {elbows, vertices, edges, startVertex, endVertex} = this
    const angle = Math.atan2(dv,du)*(180/Math.PI)
    const direction = this.angle(du, dv)

    let magnitude = Math.sqrt(du * du + dv * dv) * 1.3
    let distanceFromStart;
    let distanceFromEnd;
    let closestVertex;

    let i = 0
    while (i < 50) {
      if (this.onEdge.direction === N) {
        distanceFromStart = Math.abs(this.endU - this.startVertex.u)
        distanceFromEnd = Math.abs(this.endU - this.endVertex.u)
      } else {
        distanceFromStart = Math.abs(this.endV - this.startVertex.v)
        distanceFromEnd = Math.abs(this.endV - this.endVertex.v)
      }
      if (distanceFromStart < distanceFromEnd) {
        closestVertex = this.startVertex
      } else {
        closestVertex = this.endVertex
      }

      if (elbows.has(this.startVertex) && elbows.has(this.endVertex) && this.onEdge.lineThrough === true) {
        this.elbows.delete(closestVertex)
        this.onEdge.lineThrough = false
      }

      if (elbows.has(this.startVertex) && elbows.has(this.endVertex) && this.onEdge.lineThrough === false) {
        let lastVertex = Array.from(this.elbows)[this.elbows.size - 1]

        if (this.startVertex === lastVertex) {
          this.blockRightDown = true
          this.blockLeftUp = false
        } else {
          this.blockLeftUp = true
          this.blockRightDown = false
        }
      } else {
        this.blockLeftUp = false
        this.blockRightDown = false
      }


      if (distanceFromStart === 0 || distanceFromEnd === 0) {
        this.elbows.add(closestVertex)

        let lastVertex = Array.from(this.elbows)[this.elbows.size - 1]
        let secondLastVertex = Array.from(this.elbows)[this.elbows.size - 2]

        if (lastVertex && secondLastVertex && ((lastVertex === this.startVertex && secondLastVertex === this.endVertex) || (lastVertex === this.endVertex && secondLastVertex === this.startVertex))) {
          this.onEdge.lineThrough = true
        }

        switch (direction) {
          case UP:
            this.onEdge = this.edges[[this.coordinate(this.endU),this.coordinate(this.endV)-1,W]]
            break;
          case RIGHT:
            this.onEdge = this.edges[[this.coordinate(this.endU),this.coordinate(this.endV),N]]
            break;
          case DOWN:
            this.onEdge = this.edges[[this.coordinate(this.endU),this.coordinate(this.endV),W]]
            break;
          case LEFT:
            this.onEdge = this.edges[[this.coordinate(this.endU)-1,this.coordinate(this.endV),N]]
            break;
        }
        this.startVertex = vertices[this.onEdge.endPoints[0]]
        this.endVertex = vertices[this.onEdge.endPoints[1]]
      }

      if (this.onEdge.direction === N) {
        if (closestVertex === startVertex) {
          if (direction === UP || direction === LEFT || direction === DOWN) {
            if (this.blockLeftUp === true && magnitude > distanceFromStart - 30) {
              this.endU -= distanceFromStart - 30
              break
            } else if (distanceFromStart > magnitude) {
              this.endU -= magnitude
              break
            } else {
              magnitude -= distanceFromStart
              this.endU -= distanceFromStart
            }
          } else {
            if (distanceFromEnd > magnitude) {
              this.endU += magnitude
              break
            } else {
              magnitude -= distanceFromEnd
              this.endU += distanceFromEnd
            }
          }
        } else {
          if (direction === UP || direction === RIGHT || direction === DOWN) {
            if (this.blockRightDown === true && magnitude > distanceFromEnd - 30) {
              this.endU += distanceFromEnd - 30
              break
            } else if (distanceFromEnd > magnitude) {
              this.endU += magnitude
              break
            } else {
              magnitude -= distanceFromEnd
              this.endU += distanceFromEnd
            }
          } else {
            if (distanceFromStart > magnitude) {
              this.endU -= magnitude
              break
            } else {
              magnitude -= distanceFromStart
              this.endU -= distanceFromStart
            }
          }
        }
      } else {
        if (closestVertex === startVertex) {
          if (direction === LEFT || direction === RIGHT || direction === UP) {
            if (this.blockLeftUp === true && magnitude > distanceFromStart - 30) {
              this.endV -= distanceFromStart - 30
              break
            } else if (distanceFromStart > magnitude) {
              this.endV -= magnitude
              break
            } else {
              magnitude -= distanceFromStart
              this.endV -= distanceFromStart
            }
          } else {
            if (distanceFromEnd > magnitude) {
              this.endV += magnitude
              break
            } else {
              magnitude -= distanceFromEnd
              this.endV += distanceFromEnd
            }
          }
        } else {
          if (direction === LEFT || direction === RIGHT || direction === DOWN) {
            if (this.blockRightDown === true && magnitude > distanceFromEnd - 30) {
              this.endV += distanceFromEnd - 30
              break
            } else if (distanceFromEnd > magnitude) {
              this.endV += magnitude
              break
            } else {
              magnitude -= distanceFromEnd
              this.endV += distanceFromEnd
            }
          } else {
            if (distanceFromStart > magnitude) {
              this.endV -= magnitude
              break
            } else {
              magnitude -= distanceFromStart
              this.endV -= distanceFromStart
            }
          }
        }
      }
      i++
    }
  }

  angle(du, dv) {
    if (du > 0 && dv > 0) {
      if (du > dv) {
        return RIGHT
      } else {
        return DOWN
      }
    } else if (du > 0) {
      if (du > 0 - dv) {
        return RIGHT
      } else {
        return UP
      }
    } else if (dv > 0) {
      if (0 - du > dv) {
        return LEFT
      } else {
        return DOWN
      }
    } else {
      if (0 - du > 0 - dv) {
        return LEFT
      } else {
        return UP
      }
    }
  }

  coordinate(position) {
    return Math.floor(position / 200)
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
    ctx.fillStyle = "red"
    ctx.fill()
  }

  draw(ctx) {
    const { startU, startV, endU, endV, elbows} = this
    ctx.beginPath()
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.moveTo(startU, startV)
    elbows.forEach(e => ctx.lineTo(e.u,e.v))
    ctx.lineTo(endU,endV)
    ctx.lineWidth = 30;
    ctx.strokeStyle = "#90A7D3"
    ctx.stroke()
    ctx.lineWidth = 1;
    this.drawEnd(ctx)
  }
}
