class LineSegement {
  constructor(direction, adjecentLines) {
    this.direction = direction
    this.adjecentCells = adjecentLines || []
    this.lineThrough = false
    this.on = false
  }

  lineThrough () {
    this.lineThrough = true
  }

  draw(coords) {

  }
}
