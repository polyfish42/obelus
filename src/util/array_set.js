function arrToStr(arr) {
  return `${arr[0]}#${arr[1]}`
}

function strToArr(str) {
  const els = str.split("#")
  return els.map(e => parseInt(e))
}

Set.prototype.addArray = function (arr) {
  const str = arrToStr(arr)
  this.add(str)
}

Set.prototype.hasArray = function (arr) {
  const str = arrToStr(arr)
  return this.has(str)
}

Set.prototype.deleteArray = function (arr) {
  const str = arrToStr(arr)
  this.delete(str)
}

Set.prototype.forEachArray = function (cb) {
  this.forEach(x => {
    cb(strToArr(x))
  })
}
