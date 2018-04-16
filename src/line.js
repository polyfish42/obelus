import { W, N, END, Edge } from './coordinate_system';

const HORIZONTAL = "HORIZONTAL";
const VERTICAL = "VERTICAL";
const MIDDLE = "MIDDLE";
const UP = "UP";
const RIGHT = "RIGHT";
const DOWN = "DOWN";
const LEFT = "LEFT";
const NOT_IN_VERTEX = "NOT_IN_VERTEX";

export default class Line {
  constructor(u, v, vertices, edges) {
      this.initU = u;
      this.initV = v;
      this.vertices = vertices;
      this.edges = edges;
      this.elbows = new Set();
      this.endWidth = 10;
      this.init(u,v);
  }

  init(u, v) {
      this.startU = u * 200 + 65;
      this.startV = v * 200 + 65;
      this.endU = u * 200 + 65;
      this.endV = v * 200 + 65;
      this.onEdge = new Edge(u, v, N);
      this.startVertex = this.vertices[[u,v]];
      this.endVertex = this.vertices[this.onEdge.endPoints[1]];
      this.blockLeftUp = false;
      this.blockRightDown = false;
      this.atEnd = false;
      this.startCircleRadius = 0;
      this.startCircleGrowth = 1;
      this.lineOn = false;
  }

  turnOn() {
      this.lineOn = true;
  }

  update(du, dv) {
    if (du === 0 && dv === 0) {
	return null;
    }

    const {elbows, vertices, edges, startVertex, endVertex} = this;
    const angle = Math.atan2(dv,du)*(180/Math.PI);
    const direction = this.angle(du, dv);

    let magnitude = Math.sqrt(du * du + dv * dv) * 1.3;

    if (magnitude > 100) {
	magnitude = 100;
    }

    let nextEdge;
    let distanceFromStart;
    let distanceFromEnd;
    let closestVertex;

    let i = 0;
    while (i < 50) {
      if (this.onEdge.direction === N) {
          distanceFromStart = Math.abs(this.endU - this.startVertex.u);
          distanceFromEnd = Math.abs(this.endU - this.endVertex.u);
      } else {
          distanceFromStart = Math.abs(this.endV - this.startVertex.v);
          distanceFromEnd = Math.abs(this.endV - this.endVertex.v);
      }
      if (distanceFromStart < distanceFromEnd) {
          closestVertex = this.startVertex;
      } else {
          closestVertex = this.endVertex;
      }

      if (elbows.has(this.startVertex) && elbows.has(this.endVertex) && this.onEdge.lineThrough === true) {
          this.elbows.delete(closestVertex);
          this.onEdge.lineThrough = false;
      }

      if (elbows.has(this.startVertex) && elbows.has(this.endVertex) && this.onEdge.lineThrough === false) {
          let lastVertex = Array.from(this.elbows)[this.elbows.size - 1];

        if (this.startVertex === lastVertex) {
            this.blockRightDown = true;
            this.blockLeftUp = false;
        } else {
            this.blockLeftUp = true;
            this.blockRightDown = false;
        }
      } else {
          this.blockLeftUp = false;
          this.blockRightDown = false;
      }


      if (distanceFromStart === 0 || distanceFromEnd === 0) {
          this.elbows.add(closestVertex);

          let lastVertex = Array.from(this.elbows)[this.elbows.size - 1];
          let secondLastVertex = Array.from(this.elbows)[this.elbows.size - 2];

        if (lastVertex && secondLastVertex && ((lastVertex === this.startVertex && secondLastVertex === this.endVertex) || (lastVertex === this.endVertex && secondLastVertex === this.startVertex))) {
            this.onEdge.lineThrough = true;
        }

        switch (direction) {
          case UP:
            nextEdge = this.edges[[this.coordinate(this.endU),this.coordinate(this.endV)-1,W]];
            break;
          case RIGHT:
            nextEdge = this.edges[[this.coordinate(this.endU),this.coordinate(this.endV),N]];
            break;
          case DOWN:
            nextEdge = this.edges[[this.coordinate(this.endU),this.coordinate(this.endV),W]];
            break;
          case LEFT:
            nextEdge = this.edges[[this.coordinate(this.endU)-1,this.coordinate(this.endV),N]];
            break;
        }
        if (nextEdge) {
            this.onEdge = nextEdge;
            this.startVertex = vertices[this.onEdge.endPoints[0]];
            this.endVertex = vertices[this.onEdge.endPoints[1]];
        }
      }

      // Handle the end piece
      if (this.onEdge.type === END) {
        if (this.startVertex.type === END) {
            distanceFromStart = distanceFromStart - 160;

          if (distanceFromStart <= 30) {
              this.atEnd = true;
          } else {
              this.atEnd = false;
          }
        } else {
            distanceFromEnd = distanceFromEnd - 160;
          if (distanceFromEnd <= 30) {
              this.atEnd = true;
          } else {
              this.atEnd = false;
          }
        }
      }

      if (this.onEdge.direction === N) {
        if (closestVertex === startVertex) {
          if (direction === UP || direction === LEFT || direction === DOWN) {
            if (this.blockLeftUp === true && magnitude > distanceFromStart - 30) {
		this.endU -= distanceFromStart - 30;
		break;
            } else if (distanceFromStart > magnitude) {
		this.endU -= magnitude;
		break;
            } else {
		magnitude -= distanceFromStart;
		this.endU -= distanceFromStart;
            }
          } else {
            if (distanceFromEnd > magnitude) {
		this.endU += magnitude;
		break;
            } else {
		magnitude -= distanceFromEnd;
		this.endU += distanceFromEnd;
            }
          }
        } else {
          if (direction === UP || direction === RIGHT || direction === DOWN) {
            if (this.blockRightDown === true && magnitude > distanceFromEnd - 30) {
		this.endU += distanceFromEnd - 30;
		break;
            } else if (distanceFromEnd > magnitude) {
		this.endU += magnitude;
		break;
            } else {
		magnitude -= distanceFromEnd;
		this.endU += distanceFromEnd;
            }
          } else {
            if (distanceFromStart > magnitude) {
		this.endU -= magnitude;
		break;
            } else {
		magnitude -= distanceFromStart;
		this.endU -= distanceFromStart;
            }
          }
        }
      } else {
        if (closestVertex === startVertex) {
          if (direction === LEFT || direction === RIGHT || direction === UP) {
            if (this.blockLeftUp === true && magnitude > distanceFromStart - 30) {
		this.endV -= distanceFromStart - 30;
		break;
            } else if (distanceFromStart > magnitude) {
		this.endV -= magnitude;
		break;
            } else {
		magnitude -= distanceFromStart;
		this.endV -= distanceFromStart;
            }
          } else {
            if (distanceFromEnd > magnitude) {
		this.endV += magnitude;
		break;
            } else {
		magnitude -= distanceFromEnd;
		this.endV += distanceFromEnd;
            }
          }
        } else {
          if (direction === LEFT || direction === RIGHT || direction === DOWN) {
            if (this.blockRightDown === true && magnitude > distanceFromEnd - 30) {
		this.endV += distanceFromEnd - 30;
		break;
            } else if (distanceFromEnd > magnitude) {
		this.endV += magnitude;
		break;
            } else {
		magnitude -= distanceFromEnd;
		this.endV += distanceFromEnd;
            }
          } else {
            if (distanceFromStart > magnitude) {
		this.endV -= magnitude;
		break;
            } else {
		magnitude -= distanceFromStart;
		this.endV -= distanceFromStart;
            }
          }
        }
      }
	i++;
    }
  };

  angle(du, dv) {
    if (du > 0 && dv > 0) {
      if (du > dv) {
          return RIGHT;
      } else {
          return DOWN;
      }
    } else if (du > 0) {
      if (du > 0 - dv) {
          return RIGHT;
      } else {
          return UP;
      }
    } else if (dv > 0) {
      if (0 - du > dv) {
          return LEFT;
      } else {
          return DOWN;
      }
    } else {
      if (0 - du > 0 - dv) {
          return LEFT;
      } else {
          return UP;
      }
    }
  }

  coordinate(position) {
      return Math.floor(position / 200);
  }

  reset() {
      this.elbows.clear();
      this.init(this.initU,this.initV);
  }

  drawEnd(ctx) {
      const { endU, endV, endWidth } = this;

      ctx.beginPath();
      ctx.arc(endU, endV, endWidth, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
  }

  startAnimate(ctx) {
    if (this.lineOn === true) {
	ctx.arc(this.startU, this.startV,15,0,Math.PI*2);
	return undefined;
    }

    if (this.startCircleRadius > 15) {
	this.startCircleGrowth = -1;
    } else if (this.startCircleRadius <= 0.3){
	this.startCircleGrowth = 1;
    }

    if (this.startCircleGrowth === -1) {
	this.startCircleRadius -= 0.15;
    } else {
	this.startCircleRadius += 0.15;
    }
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.arc(this.startU, this.startV, this.startCircleRadius,0,Math.PI*2);
      ctx.stroke();
      ctx.closePath();
  };

  draw(ctx) {
      const { startU, startV, endU, endV, elbows} = this;
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      this.startAnimate(ctx);
      ctx.moveTo(startU, startV);
      elbows.forEach(e => ctx.lineTo(e.u,e.v));
      ctx.lineTo(endU,endV);
      ctx.lineWidth = 30;

    if (this.atEnd === true) {
	ctx.strokeStyle = "#F4F4F4";
    } else {
	ctx.strokeStyle = "#90A7D3";
    }
      ctx.stroke();
    ctx.lineWidth = 1;
      this.drawEnd(ctx);
  }
}
