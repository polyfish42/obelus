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
/*! exports provided: W, S, Face, Edge, Vertex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"W\", function() { return W; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"S\", function() { return S; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Face\", function() { return Face; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Edge\", function() { return Edge; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Vertex\", function() { return Vertex; });\nconst W = \"W\"\nconst S = \"S\"\n\nclass Face {\n  constructor(u, v) {\n    this.size = 200\n    this.lineWidth = 60\n    this.length = this.size - this.lineWidth/2\n    this.u = u * this.size + this.lineWidth/2\n    this.v = v * this.size + this.lineWidth/2\n  }\n\n  draw(ctx) {\n    ctx.beginPath()\n    ctx.rect(this.u, this.v, this.length, this.length)\n    ctx.stroke()\n    ctx.closePath()\n  }\n}\n\nclass Edge {\n  constructor(u, v, annotation) {\n    this.size = 200\n    this.lineWidth = 60\n    this.length = this.size/10\n\n    if (annotation === W) {\n      this.u = u * this.size + this.lineWidth/13\n      this.v = v * this.size + this.size/2\n    } else if (annotation === S) {\n      this.u = u * this.size + this.size/2\n      this.v = v * this.size + this.size + this.lineWidth/13\n    }\n  }\n\n  draw(ctx) {\n    ctx.beginPath()\n    ctx.rect(this.u, this.v, this.length, this.length)\n    ctx.stroke()\n    ctx.closePath()\n  }\n}\n\nclass Vertex {\n  constructor(u, v) {\n    this.size = 200\n    this.lineWidth = 60\n    this.u = u * this.size + this.lineWidth/4\n    this.v = v * this.size + this.size + this.lineWidth/4\n  }\n\n  pointInSurroundingRegion(u,v) {\n    if (u > this.u - 15 && u < this.u + 15 && v > this.v - 15 && v < this.v + 15) {\n      return true\n    }\n    return false\n  }\n\n  draw(ctx) {\n    ctx.beginPath()\n    ctx.arc(this.u, this.v, 10, 0, Math.PI * 2)\n    ctx.stroke()\n    ctx.closePath()\n  }\n}\n\n\n//# sourceURL=webpack:///./src/coordinate_system.js?");

/***/ }),

/***/ "./src/cursor.js":
/*!***********************!*\
  !*** ./src/cursor.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Cursor; });\nclass Cursor {\n  constructor(canvas,line) {\n    this.canvas = canvas\n    this.line = line\n    this.clickHandler = this.clickHandler.bind(this)\n    this.lockChangeAlert = this.lockChangeAlert.bind(this)\n    this.mouseMoveHandler = this.mouseMoveHandler.bind(this)\n    this.init()\n  }\n\n  init() {\n    const { canvas, clickHandler } = this\n\n    canvas.requestPointerLock = canvas.requestPointerLock ||\n    canvas.mozRequestPointerLock;\n\n    document.exitPointerLock = document.exitPointerLock    ||\n    document.mozExitPointerLock;\n\n\n    document.addEventListener(\"click\", clickHandler, false)\n  }\n\n  clickHandler(e) {\n    const { canvas, line, lockChangeAlert } = this\n\n    if (document.pointerLockElement === canvas ||\n      document.mozPointerLockElement === canvas) {\n        document.exitPointerLock()\n        debugger\n        line.reset()\n      } else {\n        canvas.requestPointerLock()\n\n        if (\"onpointerlockchange\" in document) {\n          document.addEventListener('pointerlockchange', lockChangeAlert, false);\n        } else if (\"onmozpointerlockchange\" in document) {\n          document.addEventListener('mozpointerlockchange', lockChangeAlert, false);\n        }\n      }\n  }\n\n  lockChangeAlert() {\n    const { canvas, mouseMoveHandler } = this\n\n    if (document.pointerLockElement === canvas ||\n      document.mozPointerLockElement === canvas) {\n        document.addEventListener(\"mousemove\", mouseMoveHandler, false);\n      } else {\n        document.removeEventListener(\"mousemove\", mouseMoveHandler, false);\n      }\n  }\n\n  mouseMoveHandler(e) {\n    const { canvas, line } = this\n\n    const du = e.movementX\n    const dv = e.movementY\n\n    this.line.update(du, dv)\n  }\n}\n\n\n//# sourceURL=webpack:///./src/cursor.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _puzzle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./puzzle */ \"./src/puzzle.js\");\n/* harmony import */ var _line__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./line */ \"./src/line.js\");\n/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cursor */ \"./src/cursor.js\");\n\n\n\n\nconst canvas = document.getElementById(\"myCanvas\");\nconst ctx = canvas.getContext(\"2d\")\nconst backgroundCanvas = document.getElementById(\"backgroundCanvas\")\nconst backgroundCtx= backgroundCanvas.getContext(\"2d\")\n\nconst puzzle = new _puzzle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3,3)\nconst line = new _line__WEBPACK_IMPORTED_MODULE_1__[\"default\"](25, 215, puzzle.vertices)\nconst cursor = new _cursor__WEBPACK_IMPORTED_MODULE_2__[\"default\"](canvas,line)\n\nfunction drawFrame() {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    line.draw(ctx)\n}\n\npuzzle.draw(backgroundCtx)\n\nsetInterval(drawFrame, 10);\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/line.js":
/*!*********************!*\
  !*** ./src/line.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Line; });\n/* harmony import */ var _util_array_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/array_set */ \"./src/util/array_set.js\");\n/* harmony import */ var _util_array_set__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_util_array_set__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst HORIZONTAL = \"HORIZONTAL\"\nconst VERTICAL = \"VERTICAL\"\nconst MIDDLE = \"MIDDLE\"\n\nclass Line {\n  constructor(u, v, vertices) {\n    this.startU = u\n    this.startV = v\n    this.endU = u\n    this.endV = v\n    this.vertices = vertices\n    this.direction = HORIZONTAL\n    this.endWidth = 1\n    this.elbows = new Set()\n    this.lastElbow = null\n    this.insideVertex = false\n  }\n\n  update(du, dv) {\n    const {elbows, vertices} = this\n\n    if (this.direction === MIDDLE) {\n      if (Math.abs(du) > Math.abs(dv)) {\n        this.direction = HORIZONTAL\n        this.insideVertex = false\n      } else {\n        this.direction = VERTICAL\n        this.insideVertex = false\n      }\n      this.elbows.addArray(this.lastElbow)\n    }\n\n    if (this.direction === HORIZONTAL) {\n      this.endU += du\n    } else if (this.direction === VERTICAL) {\n      this.endV += dv\n    } else {\n      this.endU += du\n      this.endV += dv\n    }\n\n    // TODO optimize for speed\n    vertices.forEach(v => {\n      if (v.pointInSurroundingRegion(this.endU, this.endV) && !this.insideVertex) {\n        this.insideVertex = true\n        this.direction = MIDDLE\n\n        if (elbows.hasArray([v.u, v.v])) {\n          elbows.deleteArray([v.u, v.v])\n        } else {\n          this.lastElbow = [v.u, v.v]\n        }\n      }\n    })\n  }\n\n  reset() {\n    this.elbows.clear()\n    this.endU = this.startU\n    this.endV = this.startV\n  }\n\n  drawEnd(ctx) {\n    const { endU, endV, endWidth } = this\n\n    ctx.beginPath()\n    ctx.arc(endU, endV, endWidth, 0, Math.PI * 2)\n    ctx.stroke()\n  }\n\n  draw(ctx) {\n    const { startU, startV, endU, endV, elbows} = this\n    ctx.beginPath()\n    ctx.lineCap = \"round\"\n    ctx.lineJoin = \"round\"\n    ctx.moveTo(startU, startV)\n    elbows.forEachArray(([u,v]) => ctx.lineTo(u,v))\n    ctx.lineTo(endU,endV)\n    ctx.lineWidth = 15;\n    ctx.stroke()\n    ctx.lineWidth = 1;\n    this.drawEnd(ctx)\n  }\n}\n\n\n//# sourceURL=webpack:///./src/line.js?");

/***/ }),

/***/ "./src/puzzle.js":
/*!***********************!*\
  !*** ./src/puzzle.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Puzzle; });\n/* harmony import */ var _coordinate_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coordinate_system */ \"./src/coordinate_system.js\");\n\n\nclass Puzzle {\n  constructor(width, height) {\n    this.width = width\n    this.height = height\n    this.faces = []\n    this.edges = []\n    this.vertices = []\n    this.generatePuzzle()\n  }\n\n  generatePuzzle() {\n    const { width, height, faces, edges, vertices } = this\n\n    for (var u = 0; u < width; u++) {\n      for (var v = 0; v < height; v++) {\n        faces.push(new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Face\"](u, v))\n        vertices.push(new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Vertex\"](u, v))\n        edges.push(new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Edge\"](u, v, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"W\"]))\n        edges.push(new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Edge\"](u, v, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"S\"]))\n      }\n    }\n\n    for (var u = 0; u < width; u++) {\n      vertices.push(new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Vertex\"](u, -1))\n      edges.push(new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Edge\"](u, -1, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"S\"]))\n    }\n\n    for (var v = 0; v < height; v++) {\n      vertices.push(new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Vertex\"](width, v))\n      edges.push(new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Edge\"](width, v, _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"W\"]))\n    }\n\n    vertices.push(new _coordinate_system__WEBPACK_IMPORTED_MODULE_0__[\"Vertex\"](width, -1))\n  }\n\n  draw(ctx) {\n    this.faces.forEach(f => f.draw(ctx))\n    this.vertices.forEach(v => v.draw(ctx))\n    this.edges.forEach(e => e.draw(ctx))\n  }\n}\n\n\n//# sourceURL=webpack:///./src/puzzle.js?");

/***/ }),

/***/ "./src/util/array_set.js":
/*!*******************************!*\
  !*** ./src/util/array_set.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function arrToStr(arr) {\n  return `${arr[0]}#${arr[1]}`\n}\n\nfunction strToArr(str) {\n  const els = str.split(\"#\")\n  return els.map(e => parseInt(e))\n}\n\nSet.prototype.addArray = function (arr) {\n  const str = arrToStr(arr)\n  this.add(str)\n}\n\nSet.prototype.hasArray = function (arr) {\n  const str = arrToStr(arr)\n  return this.has(str)\n}\n\nSet.prototype.deleteArray = function (arr) {\n  const str = arrToStr(arr)\n  this.delete(str)\n}\n\nSet.prototype.forEachArray = function (cb) {\n  this.forEach(x => {\n    cb(strToArr(x))\n  })\n}\n\n\n//# sourceURL=webpack:///./src/util/array_set.js?");

/***/ })

/******/ });