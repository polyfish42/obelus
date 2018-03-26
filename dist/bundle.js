/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/coordinate_system.js":
/*!**********************************!*\
  !*** ./src/coordinate_system.js ***!
  \**********************************/
/*! exports provided: W, N, START, END, EMPTY, BLACK_SQUARE, WHITE_SQUARE, Face, Edge, Vertex, roundRect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"W\", function() { return W; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"N\", function() { return N; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"START\", function() { return START; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"END\", function() { return END; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EMPTY\", function() { return EMPTY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BLACK_SQUARE\", function() { return BLACK_SQUARE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WHITE_SQUARE\", function() { return WHITE_SQUARE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Face\", function() { return Face; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Edge\", function() { return Edge; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Vertex\", function() { return Vertex; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"roundRect\", function() { return roundRect; });\nconst W = \"W\"\nconst N = \"N\"\nconst START = \"START\"\nconst END = \"END\"\nconst EMPTY = \"EMPTY\"\nconst BLACK_SQUARE = \"BLACK_SQUARE\"\nconst WHITE_SQUARE = \"WHITE_SQUARE\"\n\nclass Face {\n  constructor(u, v) {\n    this.initU = u\n    this.initV = v\n    this.size = 200\n    this.lineWidth = 60\n    this.length = this.size - this.lineWidth/2\n    this.fillText = `${u}, ${v}`\n    this.inside = EMPTY\n    this.u = u * this.size + this.lineWidth/2 + 50\n    this.v = v * this.size + this.lineWidth/2 + 50\n  }\n\n  setInside(symbol) {\n    this.inside = symbol\n  }\n\n  drawSymbol(ctx) {\n    switch (this.inside) {\n      case BLACK_SQUARE:\n        ctx.beginPath()\n        roundRect(ctx, this.u + 40, this.v + 40, this.length - 80, this.length - 80, 30)\n        ctx.fillStyle = \"black\"\n        ctx.fill()\n        ctx.closePath()\n        break;\n      case WHITE_SQUARE:\n        ctx.beginPath()\n        roundRect(ctx, this.u + 40, this.v + 40, this.length - 80, this.length - 80, 30)\n        ctx.fillStyle = \"white\"\n        ctx.fill()\n        ctx.closePath()\n        break;\n    }\n  }\n\n  draw(ctx) {\n    ctx.beginPath()\n    ctx.rect(this.u, this.v, this.length, this.length)\n    ctx.fillStyle = \"#3A45CC\"\n    ctx.fill()\n    // ctx.fillText(this.fillText, this.u + 100,this.v + 100)\n    ctx.closePath()\n    this.drawSymbol(ctx)\n  }\n}\n\nclass Edge {\n  constructor(u, v, annotation) {\n    this.size = 200\n    this.lineWidth = 60\n    this.length = this.size/10\n    this.fillText = `${u},${v},${annotation}`\n    this.lineThrough = false\n    this.type = EMPTY\n\n    if (annotation === W) {\n      this.direction = W\n      this.endPoints = [[u, v],[u, v + 1]]\n      this.u = u * this.size + this.lineWidth/13 + 50\n      this.v = v * this.size + this.size/2 + 200 + 50\n    } else if (annotation === N) {\n      this.direction = N\n      this.endPoints = [[u, v], [u + 1, v]]\n      this.u = u * this.size + this.size/2 + 200 + 50\n      this.v = v * this.size + this.lineWidth/13 + 50\n    }\n  }\n\n  setType(type) {\n    this.type = type\n  }\n\n  draw(ctx) {\n    ctx.beginPath()\n    ctx.rect(this.u, this.v, this.length, this.length)\n    ctx.font = \"12px Arial\"\n    ctx.fillText(this.fillText, this.u, this.v)\n    ctx.fillStyle = \"red\"\n    ctx.fill()\n    ctx.stroke()\n    ctx.closePath()\n  }\n}\n\nclass Vertex {\n  constructor(u, v) {\n    this.size = 200\n    this.lineWidth = 60\n    this.fillText = `${u},${v}`\n    this.u = u * this.size + this.lineWidth/4 + 50\n    this.v = v * this.size + this.lineWidth/4 + 50\n    this.type = EMPTY\n  }\n\n  pointInside(u,v) {\n    if (u > this.u - 1 && u < this.u + 1 && v > this.v - 1 && v < this.v + 1) {\n      return true\n    }\n    return false\n  }\n\n  setType(type) {\n    this.type = type\n  }\n\n  draw(ctx) {\n    ctx.beginPath()\n    ctx.arc(this.u, this.v, 10, 0, Math.PI * 2)\n    ctx.font = \"12px Arial\"\n    ctx.fillText(this.fillText, this.u, this.v)\n    ctx.stroke()\n    ctx.closePath()\n  }\n}\n\nconst roundRect = (ctx, x, y, width, height, radius, fill, stroke) => {\n  if (typeof stroke == 'undefined') {\n    stroke = true;\n  }\n  if (typeof radius === 'undefined') {\n    radius = 5;\n  }\n  if (typeof radius === 'number') {\n    radius = {tl: radius, tr: radius, br: radius, bl: radius};\n  } else {\n    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};\n    for (var side in defaultRadius) {\n      radius[side] = radius[side] || defaultRadius[side];\n    }\n  }\n  ctx.beginPath();\n  ctx.moveTo(x + radius.tl, y);\n  ctx.lineTo(x + width - radius.tr, y);\n  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);\n  ctx.lineTo(x + width, y + height - radius.br);\n  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);\n  ctx.lineTo(x + radius.bl, y + height);\n  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);\n  ctx.lineTo(x, y + radius.tl);\n  ctx.quadraticCurveTo(x, y, x + radius.tl, y);\n  ctx.closePath();\n  if (fill) {\n    ctx.fill();\n  }\n  if (stroke) {\n    ctx.stroke();\n  }\n\n}\n\n\n//# sourceURL=webpack:///./src/coordinate_system.js?");

/***/ }),

/***/ "./src/cursor.js":
/*!***********************!*\
  !*** ./src/cursor.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Cursor; });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nclass Cursor {\n  constructor(canvas,line) {\n    this.canvas = canvas\n    this.line = line\n    this.clickHandler = this.clickHandler.bind(this)\n    this.lockChangeAlert = this.lockChangeAlert.bind(this)\n    this.mouseMoveHandler = this.mouseMoveHandler.bind(this)\n    this.init()\n  }\n\n  init() {\n    const { canvas, clickHandler } = this\n\n    canvas.requestPointerLock = canvas.requestPointerLock ||\n    canvas.mozRequestPointerLock;\n\n    document.exitPointerLock = document.exitPointerLock    ||\n    document.mozExitPointerLock;\n\n\n    document.addEventListener(\"click\", clickHandler, false)\n  }\n\n  clickHandler(e) {\n    const { canvas, line, lockChangeAlert } = this\n\n    if (document.pointerLockElement === canvas ||\n      document.mozPointerLockElement === canvas) {\n        document.exitPointerLock()\n        Object(_game__WEBPACK_IMPORTED_MODULE_0__[\"isGameWon\"])()\n      } else {\n        canvas.requestPointerLock()\n\n        if (\"onpointerlockchange\" in document) {\n          document.addEventListener('pointerlockchange', lockChangeAlert, false);\n        } else if (\"onmozpointerlockchange\" in document) {\n          document.addEventListener('mozpointerlockchange', lockChangeAlert, false);\n        }\n      }\n  }\n\n  lockChangeAlert() {\n    const { canvas, mouseMoveHandler } = this\n\n    if (document.pointerLockElement === canvas ||\n      document.mozPointerLockElement === canvas) {\n        document.addEventListener(\"mousemove\", mouseMoveHandler, false);\n      } else {\n        document.removeEventListener(\"mousemove\", mouseMoveHandler, false);\n      }\n  }\n\n  mouseMoveHandler(e) {\n    const { canvas, line } = this\n\n    const du = e.movementX\n    const dv = e.movementY\n\n    this.line.update(du, dv)\n  }\n}\n\n\n//# sourceURL=webpack:///./src/cursor.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: isGameWon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isGameWon\", function() { return isGameWon; });\n/* harmony import */ var _puzzle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./puzzle */ \"./src/puzzle.js\");\n/* harmony import */ var _line__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./line */ \"./src/line.js\");\n/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cursor */ \"./src/cursor.js\");\n/* harmony import */ var _win_check__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./win_check */ \"./src/win_check.js\");\n/* harmony import */ var _coordinate_system__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./coordinate_system */ \"./src/coordinate_system.js\");\n\n\n\n\n\n\nconst canvas = document.getElementById(\"myCanvas\");\nconst ctx = canvas.getContext(\"2d\")\nconst backgroundCanvas = document.getElementById(\"backgroundCanvas\")\nconst backgroundCtx= backgroundCanvas.getContext(\"2d\")\n\nconst puzzle = new _puzzle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3,3)\nconst line = new _line__WEBPACK_IMPORTED_MODULE_1__[\"default\"](0, 3, puzzle.vertices, puzzle.edges)\nconst cursor = new _cursor__WEBPACK_IMPORTED_MODULE_2__[\"default\"](canvas,line)\n\n\nconst drawFrame = () => {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    line.draw(ctx)\n}\n\nconst isGameWon = () => {\n  if (line.atEnd === true) {\n    Object(_win_check__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(line, puzzle)\n  } else {\n    line.reset()\n  }\n}\n\npuzzle.setStart([0,3])\npuzzle.setEnd(-1,2,_coordinate_system__WEBPACK_IMPORTED_MODULE_4__[\"N\"])\npuzzle.faces[[0,0]].inside = _coordinate_system__WEBPACK_IMPORTED_MODULE_4__[\"BLACK_SQUARE\"]\npuzzle.faces[[1,0]].inside = _coordinate_system__WEBPACK_IMPORTED_MODULE_4__[\"BLACK_SQUARE\"]\npuzzle.faces[[2,0]].inside = _coordinate_system__WEBPACK_IMPORTED_MODULE_4__[\"BLACK_SQUARE\"]\npuzzle.faces[[0,1]].inside = _coordinate_system__WEBPACK_IMPORTED_MODULE_4__[\"BLACK_SQUARE\"]\npuzzle.faces[[2,1]].inside = _coordinate_system__WEBPACK_IMPORTED_MODULE_4__[\"BLACK_SQUARE\"]\npuzzle.faces[[1,1]].inside = _coordinate_system__WEBPACK_IMPORTED_MODULE_4__[\"WHITE_SQUARE\"]\npuzzle.faces[[0,2]].inside = _coordinate_system__WEBPACK_IMPORTED_MODULE_4__[\"WHITE_SQUARE\"]\npuzzle.faces[[1,2]].inside = _coordinate_system__WEBPACK_IMPORTED_MODULE_4__[\"WHITE_SQUARE\"]\npuzzle.faces[[2,2]].inside = _coordinate_system__WEBPACK_IMPORTED_MODULE_4__[\"WHITE_SQUARE\"]\npuzzle.draw(backgroundCtx)\n\nsetInterval(drawFrame, 10);\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/line.js":
/*!*********************!*\
  !*** ./src/line.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Line; });\n/* harmony import */ var _coordinate_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coordinate_system */ \"./src/coordinate_system.js\");\n\n\nconst HORIZONTAL = \"HORIZONTAL\"\nconst VERTICAL = \"VERTICAL\"\nconst MIDDLE = \"MIDDLE\"\nconst UP = \"UP\"\nconst RIGHT = \"RIGHT\"\nconst DOWN = \"DOWN\"\nconst LEFT = \"LEFT\"\nconst NOT_IN_VERTEX = \"NOT_IN_VERTEX\"\n\nclass Line {\n  constructor(u, v, vertices, edges) {\n    this.initU = u\n    this.initV = v\n    this.vertices = vertices\n    this.edges = edges\n    this.elbows = new Set()\n    this.endWidth = 10\n    this.init(u,v)\n  }\n\n  init(u, v) {\n    this.startU = u * 200 + 65\n    this.startV = v * 200 + 65\n    this.endU = u * 200 + 65\n    this.endV = v * 200 + 65\n    this.onEdge = new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Edge\"](u, v, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"N\"])\n    this.startVertex = this.vertices[[u,v]]\n    this.endVertex = this.vertices[this.onEdge.endPoints[1]]\n    this.blockLeftUp = false\n    this.blockRightDown = false\n    this.atEnd = false\n  }\n\n  update(du, dv) {\n    if (du === 0 && dv === 0) {\n      return null\n    }\n\n    const {elbows, vertices, edges, startVertex, endVertex} = this\n    const angle = Math.atan2(dv,du)*(180/Math.PI)\n    const direction = this.angle(du, dv)\n\n    let magnitude = Math.sqrt(du * du + dv * dv) * 1.3\n    if (magnitude > 100) {\n      magnitude = 100\n    }\n    let nextEdge;\n    let distanceFromStart;\n    let distanceFromEnd;\n    let closestVertex;\n\n    let i = 0\n    while (i < 50) {\n      if (this.onEdge.direction === _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"N\"]) {\n        distanceFromStart = Math.abs(this.endU - this.startVertex.u)\n        distanceFromEnd = Math.abs(this.endU - this.endVertex.u)\n      } else {\n        distanceFromStart = Math.abs(this.endV - this.startVertex.v)\n        distanceFromEnd = Math.abs(this.endV - this.endVertex.v)\n      }\n      if (distanceFromStart < distanceFromEnd) {\n        closestVertex = this.startVertex\n      } else {\n        closestVertex = this.endVertex\n      }\n\n      if (elbows.has(this.startVertex) && elbows.has(this.endVertex) && this.onEdge.lineThrough === true) {\n        this.elbows.delete(closestVertex)\n        this.onEdge.lineThrough = false\n      }\n\n      if (elbows.has(this.startVertex) && elbows.has(this.endVertex) && this.onEdge.lineThrough === false) {\n        let lastVertex = Array.from(this.elbows)[this.elbows.size - 1]\n\n        if (this.startVertex === lastVertex) {\n          this.blockRightDown = true\n          this.blockLeftUp = false\n        } else {\n          this.blockLeftUp = true\n          this.blockRightDown = false\n        }\n      } else {\n        this.blockLeftUp = false\n        this.blockRightDown = false\n      }\n\n\n      if (distanceFromStart === 0 || distanceFromEnd === 0) {\n        this.elbows.add(closestVertex)\n\n        let lastVertex = Array.from(this.elbows)[this.elbows.size - 1]\n        let secondLastVertex = Array.from(this.elbows)[this.elbows.size - 2]\n\n        if (lastVertex && secondLastVertex && ((lastVertex === this.startVertex && secondLastVertex === this.endVertex) || (lastVertex === this.endVertex && secondLastVertex === this.startVertex))) {\n          this.onEdge.lineThrough = true\n        }\n\n        switch (direction) {\n          case UP:\n            nextEdge = this.edges[[this.coordinate(this.endU),this.coordinate(this.endV)-1,_coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"W\"]]]\n            break;\n          case RIGHT:\n            nextEdge = this.edges[[this.coordinate(this.endU),this.coordinate(this.endV),_coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"N\"]]]\n            break;\n          case DOWN:\n            nextEdge = this.edges[[this.coordinate(this.endU),this.coordinate(this.endV),_coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"W\"]]]\n            break;\n          case LEFT:\n            nextEdge = this.edges[[this.coordinate(this.endU)-1,this.coordinate(this.endV),_coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"N\"]]]\n            break;\n        }\n        if (nextEdge) {\n          this.onEdge = nextEdge\n          this.startVertex = vertices[this.onEdge.endPoints[0]]\n          this.endVertex = vertices[this.onEdge.endPoints[1]]\n        }\n      }\n\n      // Handle the end piece\n      if (this.onEdge.type === _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"END\"]) {\n        if (this.startVertex.type === _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"END\"]) {\n          distanceFromStart = distanceFromStart - 160\n\n          if (distanceFromStart === 0) {\n            this.atEnd = true\n          } else {\n            this.atEnd = false\n          }\n        } else {\n          distanceFromEnd = distanceFromEnd - 160\n          if (distanceFromEnd === 0) {\n            this.atEnd = true\n          } else {\n            this.atEnd = false\n          }\n        }\n      }\n\n      if (this.onEdge.direction === _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"N\"]) {\n        if (closestVertex === startVertex) {\n          if (direction === UP || direction === LEFT || direction === DOWN) {\n            if (this.blockLeftUp === true && magnitude > distanceFromStart - 30) {\n              this.endU -= distanceFromStart - 30\n              break\n            } else if (distanceFromStart > magnitude) {\n              this.endU -= magnitude\n              break\n            } else {\n              magnitude -= distanceFromStart\n              this.endU -= distanceFromStart\n            }\n          } else {\n            if (distanceFromEnd > magnitude) {\n              this.endU += magnitude\n              break\n            } else {\n              magnitude -= distanceFromEnd\n              this.endU += distanceFromEnd\n            }\n          }\n        } else {\n          if (direction === UP || direction === RIGHT || direction === DOWN) {\n            if (this.blockRightDown === true && magnitude > distanceFromEnd - 30) {\n              this.endU += distanceFromEnd - 30\n              break\n            } else if (distanceFromEnd > magnitude) {\n              this.endU += magnitude\n              break\n            } else {\n              magnitude -= distanceFromEnd\n              this.endU += distanceFromEnd\n            }\n          } else {\n            if (distanceFromStart > magnitude) {\n              this.endU -= magnitude\n              break\n            } else {\n              magnitude -= distanceFromStart\n              this.endU -= distanceFromStart\n            }\n          }\n        }\n      } else {\n        if (closestVertex === startVertex) {\n          if (direction === LEFT || direction === RIGHT || direction === UP) {\n            if (this.blockLeftUp === true && magnitude > distanceFromStart - 30) {\n              this.endV -= distanceFromStart - 30\n              break\n            } else if (distanceFromStart > magnitude) {\n              this.endV -= magnitude\n              break\n            } else {\n              magnitude -= distanceFromStart\n              this.endV -= distanceFromStart\n            }\n          } else {\n            if (distanceFromEnd > magnitude) {\n              this.endV += magnitude\n              break\n            } else {\n              magnitude -= distanceFromEnd\n              this.endV += distanceFromEnd\n            }\n          }\n        } else {\n          if (direction === LEFT || direction === RIGHT || direction === DOWN) {\n            if (this.blockRightDown === true && magnitude > distanceFromEnd - 30) {\n              this.endV += distanceFromEnd - 30\n              break\n            } else if (distanceFromEnd > magnitude) {\n              this.endV += magnitude\n              break\n            } else {\n              magnitude -= distanceFromEnd\n              this.endV += distanceFromEnd\n            }\n          } else {\n            if (distanceFromStart > magnitude) {\n              this.endV -= magnitude\n              break\n            } else {\n              magnitude -= distanceFromStart\n              this.endV -= distanceFromStart\n            }\n          }\n        }\n      }\n      i++\n    }\n  }\n\n  angle(du, dv) {\n    if (du > 0 && dv > 0) {\n      if (du > dv) {\n        return RIGHT\n      } else {\n        return DOWN\n      }\n    } else if (du > 0) {\n      if (du > 0 - dv) {\n        return RIGHT\n      } else {\n        return UP\n      }\n    } else if (dv > 0) {\n      if (0 - du > dv) {\n        return LEFT\n      } else {\n        return DOWN\n      }\n    } else {\n      if (0 - du > 0 - dv) {\n        return LEFT\n      } else {\n        return UP\n      }\n    }\n  }\n\n  coordinate(position) {\n    return Math.floor(position / 200)\n  }\n\n  reset() {\n    this.elbows.clear()\n    this.init(this.initU,this.initV)\n  }\n\n  drawEnd(ctx) {\n    const { endU, endV, endWidth } = this\n\n    ctx.beginPath()\n    ctx.arc(endU, endV, endWidth, 0, Math.PI * 2)\n    ctx.fillStyle = \"white\"\n    ctx.fill()\n  }\n\n  draw(ctx) {\n    const { startU, startV, endU, endV, elbows} = this\n    ctx.beginPath()\n    ctx.lineCap = \"round\"\n    ctx.lineJoin = \"round\"\n    ctx.arc(startU, startV,25,0,Math.PI*2)\n    ctx.moveTo(startU, startV)\n    elbows.forEach(e => ctx.lineTo(e.u,e.v))\n    ctx.lineTo(endU,endV)\n    ctx.lineWidth = 30;\n\n    if (this.atEnd === true) {\n      ctx.strokeStyle = \"red\"\n    } else {\n      ctx.strokeStyle = \"#90A7D3\"\n    }\n    ctx.stroke()\n    ctx.lineWidth = 1;\n    this.drawEnd(ctx)\n  }\n}\n\n\n//# sourceURL=webpack:///./src/line.js?");

/***/ }),

/***/ "./src/puzzle.js":
/*!***********************!*\
  !*** ./src/puzzle.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Puzzle; });\n/* harmony import */ var _coordinate_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coordinate_system */ \"./src/coordinate_system.js\");\n\n\nconst UP = \"UP\"\nconst DOWN = \"DOWN\"\nconst LEFT = \"LEFT\"\nconst RIGHT = \"RIGHT\"\n\nclass Puzzle {\n  constructor(width, height) {\n    this.width = width\n    this.height = height\n    this.faces = {}\n    this.edges = {}\n    this.vertices = {}\n    this.endNub = null\n    this.endNubDirection = null\n    this.generatePuzzle()\n  }\n\n  setStart(coord) {\n    this.vertices[coord].type = _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"START\"]\n  }\n\n  setEnd(u,v, direction) {\n    const end = this.edges[[u, v, direction]] = new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Edge\"](u, v, direction)\n\n    let vertex;\n    if (direction === _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"N\"] && u === this.width) {\n      vertex = this.vertices[[u + 1, v]] = new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Vertex\"](u + 1, v)\n      this.endNub = this.vertices[[u ,v]]\n      this.endNubDirection = RIGHT\n    } else if (direction === _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"N\"]) {\n      vertex = this.vertices[[u,v]] = new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Vertex\"](u, v)\n      this.endNub = this.vertices[[u + 1, v]]\n      this.endNubDirection = LEFT\n    } else if (direction === _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"W\"] && v === this.height) {\n      vertex = this.vertices[[u, v + 1]] = new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Vertex\"](u, v + 1)\n      this.endNub = this.vertices[[u ,v]]\n      this.endNubDirection = DOWN\n    } else if (direction === _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"W\"]) {\n      vertex = this.vertices[[u, v]] = new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Vertex\"](u, v)\n      this.endNub = this.vertices[[u, v + 1]]\n      this.endNubDirection = UP\n    }\n\n    end.type = _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"END\"]\n    vertex.type = _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"END\"]\n  }\n\n  generatePuzzle() {\n    const { width, height, faces, edges, vertices } = this\n\n    for (var u = 0; u < width; u++) {\n      for (var v = 0; v < height; v++) {\n        faces[[u, v]] = new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Face\"](u, v)\n        vertices[[u, v]] = new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Vertex\"](u, v)\n        edges[[u, v, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"W\"]]] = new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Edge\"](u, v, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"W\"])\n        edges[[u, v, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"N\"]]] = new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Edge\"](u, v, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"N\"])\n      }\n    }\n\n    for (var u = 0; u < width; u++) {\n      vertices[[u, v]] = new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Vertex\"](u, v)\n      edges[[u, height, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"N\"]]] = new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Edge\"](u, height, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"N\"])\n    }\n\n    for (var v = 0; v < height; v++) {\n      vertices[[u, v]] = new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Vertex\"](width, v)\n      edges[[width, v , _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"W\"]]] = new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Edge\"](width, v, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"W\"])\n    }\n\n    vertices[[width, height]] = new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Vertex\"](width, height)\n  }\n\n  drawEndNub(ctx) {\n    ctx.beginPath()\n    // ctx.moveTo()\n    ctx.moveTo(this.endNub.u,this.endNub.v)\n    switch (this.endNubDirection) {\n      case UP:\n        ctx.lineTo(this.endNub.u, this.endNub.v - 40)\n        break;\n      case RIGHT:\n        ctx.lineTo(this.endNub.u + 40, this.endNub.v)\n        break;\n      case DOWN:\n        ctx.lineTo(this.endNub.u, this.endNub.v + 40)\n        break;\n      case LEFT:\n        ctx.lineTo(this.endNub.u - 40, this.endNub.v)\n        break;\n      default:\n        ctx.closePath()\n    }\n    ctx.lineWidth = 30\n    ctx.lineCap = \"round\"\n    ctx.strokeStyle = \"#0F0E6F\" \n    ctx.stroke()\n    ctx.closePath()\n  }\n\n  draw(ctx) {\n    ctx.beginPath()\n    ctx.rect(0,0, (this.width) * 200 + 150, (this.height) * 200 + 150)\n    ctx.fillStyle = \"#3A45CC\"\n    ctx.fill()\n    ctx.beginPath()\n    Object(_coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"roundRect\"])(ctx,50,50,this.width * 210,this.height * 210, 25)\n    ctx.fillStyle = \"#0F0E6F\"\n    ctx.fill()\n    Object.values(this.faces).forEach(f => f.draw(ctx))\n    this.drawEndNub(ctx)\n    // Object.values(this.vertices).forEach(v => v.draw(ctx))\n    // Object.values(this.edges).forEach(e => e.draw(ctx))\n  }\n}\n\n\n//# sourceURL=webpack:///./src/puzzle.js?");

/***/ }),

/***/ "./src/win_check.js":
/*!**************************!*\
  !*** ./src/win_check.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _coordinate_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coordinate_system */ \"./src/coordinate_system.js\");\n\n\n\nArray.prototype.removeUndefined = function(deleteValue) {\n  for (var i = 0; i < this.length; i++) {\n    if (this[i] == deleteValue) {\n      this.splice(i, 1);\n      i--;\n    }\n  }\n  return this;\n};\n\nconst borders = (u, v) => {\n  return [[u, v, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"N\"]],\n          [u, v, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"W\"]],\n          [u, v + 1, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"N\"]],\n          [u + 1, v, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"W\"]]]\n}\n\nconst adjacentSquares = (border, puzzle, sq) => {\n  const [u, v, direction] = border\n  let joins = []\n  if (direction === _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"N\"]) {\n    joins = [puzzle.faces[[u, v - 1]], puzzle.faces[[u, v]]]\n  } else {\n    joins = [puzzle.faces[[u - 1, v]], puzzle.faces[[u, v]]]\n  }\n\n  joins.removeUndefined()\n  return joins\n}\n\nconst checkSquare = (square, line, puzzle, oppositeColor) => {\n  const checkedSquares = new Set()\n  checkedSquares.add(square)\n  const squares = [square]\n  let sq;\n  let allLegal = true\n\n  while (squares.length > 0) {\n    sq = squares.shift()\n\n    borders(sq.initU, sq.initV).forEach(border => {\n      if (puzzle.edges[border]) {\n        if (puzzle.edges[border].lineThrough === false) {\n          adjacentSquares(border, puzzle, sq).forEach(join => {\n            if (!checkedSquares.has(join)) {\n              if (join.inside === oppositeColor) {\n                allLegal = false\n              } else {\n                checkedSquares.add(join)\n                squares.push(join)\n              }\n            }\n          })\n        }\n      }\n    })\n  }\n  return allLegal\n}\n\nconst allSquaresWon = (line, puzzle) => {\n  return Object.values(puzzle.faces).reduce((bool, face) => {\n    if (bool === false) {\n      return false\n    }\n\n    switch (face.inside) {\n      case _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"EMPTY\"]:\n        return true\n        break;\n      case _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"WHITE_SQUARE\"]:\n        return checkSquare(face, line, puzzle, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"BLACK_SQUARE\"])\n      case _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"BLACK_SQUARE\"]:\n        return checkSquare(face, line, puzzle, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"WHITE_SQUARE\"])\n      default:\n        return bool\n    }\n  }, true)\n}\n\nconst checkIfWon = (line, puzzle) => {\n  if (allSquaresWon(line, puzzle)) {\n    console.log(\"YOU win!\");\n  } else {\n    line.reset()\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (checkIfWon);\n\n// check each direction. Is that edge on? then stop. else check that neighbor. Continue and keep track of tiles I've alread checked\n\n\n//# sourceURL=webpack:///./src/win_check.js?");

/***/ })

/******/ });