const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d")

class L {
  constructor() {
    this.u = 35
    this.v = 35
  }

  update(du, dv) {
    if (this.u + du > 150 && this.u + du < 200 && this.v + dv < 200 && this.v + dv < 200) {
      return undefined
    } else {
      this.u += du
      this.v += dv + du
    }
  }
}

class Cursor {
  constructor(canvas, line) {
    this.line = line
    this.canvas = canvas
    this.clickHandler = this.clickHandler.bind(this)
    this.lockChangeAlert = this.lockChangeAlert.bind(this)
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this)
    this.init()
  }

  init() {
    const { canvas, clickHandler } = this

    canvas.requestPointerLock = canvas.requestPointerLock ||
    canvas.mozRequestPointerLock;

    document.exitPointerLock = document.exitPointerLock    ||
    document.mozExitPointerLock;


    document.addEventListener("click", clickHandler, false)
  }

  clickHandler(e) {
    const { canvas, line, lockChangeAlert } = this

    if (document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas) {
        document.exitPointerLock()
        line.reset()
      } else {
        canvas.requestPointerLock()

        if ("onpointerlockchange" in document) {
          document.addEventListener('pointerlockchange', lockChangeAlert, false);
        } else if ("onmozpointerlockchange" in document) {
          document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
        }
      }
  }

  lockChangeAlert() {
    const { canvas, mouseMoveHandler } = this

    if (document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas) {
        document.addEventListener("mousemove", mouseMoveHandler, false);
      } else {
        document.removeEventListener("mousemove", mouseMoveHandler, false);
      }
  }

  mouseMoveHandler(e) {
    const { canvas } = this

    const du = e.movementX
    const dv = e.movementY

    this.line.update(du, dv)
  }
}
const line = new L
const cursor = new Cursor(canvas, line)

function draw() {
  ctx.clearRect(0,0,600,600)
  ctx.beginPath()
  ctx.rect(150,150,200,200)
  ctx.stroke()

  ctx.beginPath()
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.moveTo(30, 30)
  ctx.lineTo(line.u,line.v)
  ctx.lineWidth = 15;
  ctx.stroke()
  ctx.lineWidth = 1;
}

setInterval(draw, 10)
