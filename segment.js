var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

class Segment {
  constructor(ctx, type, coordinates) {
    this.ctx = ctx
    this.type = type
    this.x = coordinates[0]
    this.y = coordinates[1]
  }

  draw() {
    const {ctx, type, x, y} = this

    if (type === "empty") {
      return null
    }

    // ...
  }
}

const seg = new Segment(ctx, "empty", [0,0])
seg.draw()
