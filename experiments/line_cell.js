class lineCell {
  constructor(prevCell, adjecentCells) {
    this.prevCell = prevCell
    this.nextCell = null
    this.adjecentCells = adjecentCells || []
    this.lineThrough = false
  }

  lineRetreat () {
    this.lineThrough = false
    return this.prevCell
  }

  lineThrough () {
    this.lineThrough = true
  }

  lineNext () {
    return this.nextCell
  }

  link(nextCell) {
    this.nextCell = nextCell
  }
}

export default lineCell;
