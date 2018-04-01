import { isGameWon, drawFrame, clearLine } from './game'

export default class Cursor {
  constructor(canvas,line) {
    this.canvas = canvas
    this.line = line
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


      document.addEventListener("click", clickHandler, false);
  }

  clickHandler(e) {
    const { canvas, line, lockChangeAlert } = this

    if (document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas) {
        document.exitPointerLock();
        isGameWon();
      } else {
          canvas.requestPointerLock();

        if ("onpointerlockchange" in document) {
          document.addEventListener('pointerlockchange', lockChangeAlert, false);
            line.turnOn();
        } else if ("onmozpointerlockchange" in document) {
          document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
            line.turnOn();
        }
      }
  }

  lockChangeAlert() {
    const { canvas, mouseMoveHandler } = this;

    if (document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas) {
        document.addEventListener("mousemove", mouseMoveHandler, false);
      } else {
        document.removeEventListener("mousemove", mouseMoveHandler, false);
	const instructions = document.querySelectorAll(".instructions");
	   
        if (instructions !== null) {
              instructions.forEach(i => i.parentNode.removeChild(i));
        }
      }
  }

  mouseMoveHandler(e) {
      const { canvas, line } = this;

      const du = e.movementX;
      const dv = e.movementY;

      this.line.update(du, dv);
  }
}
