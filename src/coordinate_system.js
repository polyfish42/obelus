export const W = "W"
export const N = "N"
export const START = "START"
export const END = "END"
export const EMPTY = "EMPTY"
export const BLACK_SQUARE = "BLACK_SQUARE"
export const WHITE_SQUARE = "WHITE_SQUARE"

export class Face {
  constructor(u, v) {
    this.size = 200
    this.lineWidth = 60
    this.length = this.size - this.lineWidth/2
    this.fillText = `${u}, ${v}`
    this.inside = EMPTY
    this.u = u * this.size + this.lineWidth/2
    this.v = v * this.size + this.lineWidth/2
  }

  setInside(symbol) {
    this.inside = symbol
  }

  drawSymbol(ctx) {
    switch (this.inside) {
      case BLACK_SQUARE:
        ctx.beginPath()
        roundRect(ctx, this.u + 40, this.v + 40, this.length - 80, this.length - 80, 30)
        ctx.fillStyle = "black"
        ctx.fill()
        ctx.closePath()
        break;
      case WHITE_SQUARE:
        ctx.beginPath()
        roundRect(ctx, this.u + 40, this.v + 40, this.length - 80, this.length - 80, 30)
        ctx.fillStyle = "white"
        ctx.fill()
        ctx.closePath()
        break;
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.rect(this.u, this.v, this.length, this.length)
    ctx.fillStyle = "#3A45CC"
    ctx.fill()
    // ctx.fillText(this.fillText, this.u + 100,this.v + 100)
    ctx.closePath()
    this.drawSymbol(ctx)
  }
}

export class Edge {
  constructor(u, v, annotation) {
    this.size = 200
    this.lineWidth = 60
    this.length = this.size/10
    this.fillText = `${u},${v},${annotation}`
    this.lineThrough = false
    this.type = EMPTY

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

  setType(type) {
    this.type = type
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.rect(this.u, this.v, this.length, this.length)
    ctx.font = "12px Arial"
    ctx.fillText(this.fillText, this.u, this.v)
    ctx.fillStyle = "red"
    ctx.fill()
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
    this.type = EMPTY
  }

  pointInside(u,v) {
    if (u > this.u - 1 && u < this.u + 1 && v > this.v - 1 && v < this.v + 1) {
      return true
    }
    return false
  }

  setType(type) {
    this.type = type
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

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}
