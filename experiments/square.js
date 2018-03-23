var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

class Square {
  constructor(ctx, type, coordinates) {
    this.ctx = ctx
    this.type = type
    this.x = coordinates[0]
    this.y = coordinates[1]
  }

  draw() {
    const {ctx, x, y} = this

    ctx.beginPath()
    ctx.lineWidth = 1;
    ctx.rect(x, y, 200, 200)
    ctx.stroke()
  }
}

const squares = [new Square(ctx, "empty", [0,0]), new Square(ctx, "empty", [300,300])]
squares.forEach(square => square.draw())
