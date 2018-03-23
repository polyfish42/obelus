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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var canvas = document.getElementById(\"myCanvas\");\nvar ctx = canvas.getContext(\"2d\")\nvar backgroundCanvas = document.getElementById(\"backgroundCanvas\")\nvar backgroundCtx= backgroundCanvas.getContext(\"2d\")\n\ncanvas.requestPointerLock = canvas.requestPointerLock ||\n                            canvas.mozRequestPointerLock;\n\ndocument.exitPointerLock = document.exitPointerLock    ||\n                           document.mozExitPointerLock;\n\n\nconst HORIZONTAL = \"HORIZONTAL\"\nconst VERTICAL = \"VERTICAL\"\nconst MIDDLE = \"MIDDLE\"\n\nlet x = 25\nlet y = 215\nlet direction = HORIZONTAL\nlet middle = [230, 210]\nlet guyWidth = 1\nlet coords = [0,0];\nlet elbows = new Set()\nlet lastMouseCoords = [0,0];\n\nfunction arrToStr(arr) {\n  return `${arr[0]}#${arr[1]}`\n}\n\nfunction strToArr(str) {\n  const els = str.split(\"#\")\n  return els.map(e => parseInt(e))\n}\n\nSet.prototype.addArray = function (arr) {\n  const str = arrToStr(arr)\n  this.add(str)\n}\n\nSet.prototype.hasArray = function (arr) {\n  const str = arrToStr(arr)\n  return this.has(str)\n}\n\nSet.prototype.deleteArray = function (arr) {\n  const str = arrToStr(arr)\n  this.delete(str)\n}\n\nSet.prototype.forEachArray = function (cb) {\n  this.forEach(x => {\n    cb(strToArr(x))\n  })\n}\n\ndocument.addEventListener(\"click\", clickHandler, false)\n\nfunction clickHandler(e) {\n  if (document.pointerLockElement === canvas ||\n      document.mozPointerLockElement === canvas) {\n    document.exitPointerLock()\n    x = 20\n    y = 210\n    elbows.clear()\n  } else {\n    canvas.requestPointerLock()\n    lastMouseCoords = [e.screenX, e.screenY]\n\n    if (\"onpointerlockchange\" in document) {\n      document.addEventListener('pointerlockchange', lockChangeAlert, false);\n    } else if (\"onmozpointerlockchange\" in document) {\n      document.addEventListener('mozpointerlockchange', lockChangeAlert, false);\n    }\n  }\n}\n\nfunction lockChangeAlert() {\n  if (document.pointerLockElement === canvas ||\n      document.mozPointerLockElement === canvas) {\n    console.log('The pointer lock status is now locked');\n    document.addEventListener(\"mousemove\", mouseMoveHandler, false);\n  } else {\n    console.log('The pointer lock status is now unlocked');\n    document.removeEventListener(\"mousemove\", mouseMoveHandler, false);\n  }\n}\n\nlet lastElbow;\nlet insideVertex = false;\n\nfunction mouseMoveHandler(e) {\n  const dx = e.movementX\n  const dy = e.movementY\n\n  if (direction === MIDDLE) {\n    if (Math.abs(dx) > Math.abs(dy)) {\n      direction = HORIZONTAL\n      // y = 215\n     insideVertex = false\n    } else {\n      direction = VERTICAL\n      // x = 215\n     insideVertex = false\n    }\n    elbows.addArray(lastElbow)\n  }\n\n  if (direction === HORIZONTAL) {\n    x += dx\n  } else if (direction === VERTICAL) {\n    y += dy\n  } else {\n    x += dx\n    y += dy\n  }\n// this needs to be optimized\n  vertices.forEach(v => {\n    if (v.pointInSurroundingRegion(x,y) && !insideVertex) {\n      insideVertex = true\n      direction = MIDDLE\n\n      if (elbows.hasArray([v.u, v.v])) {\n        elbows.deleteArray([v.u, v.v])\n      } else {\n        lastElbow = [v.u, v.v]\n      }\n    }\n  })\n\n  // if (x >= 220 && x <= 240 && y >= 200 && y <= 220) {\n  //   direction = MIDDLE\n  // }\n\n  lastMouseCoords = [e.screenX, e.screenY]\n}\n\nfunction drawGuy() {\n  ctx.beginPath()\n  ctx.arc(x, y, guyWidth, 0, Math.PI * 2)\n  ctx.stroke()\n}\n\nfunction drawLine() {\n  ctx.beginPath()\n  ctx.lineCap = \"round\"\n  ctx.lineJoin = \"round\"\n  ctx.moveTo(25, 215)\n  elbows.forEachArray(([x, y]) => ctx.lineTo(x ,y))\n  ctx.lineTo(x,y)\n  ctx.lineWidth = 15;\n  ctx.stroke()\n  ctx.lineWidth = 1;\n}\n\nfunction draw() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  drawGuy()\n  drawLine()\n}\n\n\nconst W = \"W\"\nconst S = \"S\"\n\nclass Face {\n  constructor(u, v) {\n    this.size = 200\n    this.lineWidth = 60\n    this.length = this.size - this.lineWidth/2\n    this.u = u * this.size + this.lineWidth/2\n    this.v = v * this.size + this.lineWidth/2\n  }\n\n  draw(ctx) {\n    ctx.beginPath()\n    ctx.rect(this.u, this.v, this.length, this.length)\n    ctx.stroke()\n    ctx.closePath()\n  }\n}\n\nclass Vertex {\n  constructor(u, v) {\n    this.size = 200\n    this.lineWidth = 60\n    this.u = u * this.size + this.lineWidth/4\n    this.v = v * this.size + this.size + this.lineWidth/4\n  }\n\n  pointInSurroundingRegion(u,v) {\n    // console.log(`current: ${u},${v} vertex: ${this.u},${this.v}`);\n    if (u > this.u - 15 && u < this.u + 15 && v > this.v - 15 && v < this.v + 15) {\n      return true\n    }\n    return false\n  }\n\n  draw(ctx) {\n    ctx.beginPath()\n    ctx.arc(this.u, this.v, 10, 0, Math.PI * 2)\n    ctx.stroke()\n    ctx.closePath()\n  }\n}\n\nclass Edge {\n  constructor(u, v, annotation) {\n    this.size = 200\n    this.lineWidth = 60\n    this.length = this.size/10\n\n    if (annotation === W) {\n      this.u = u * this.size + this.lineWidth/13\n      this.v = v * this.size + this.size/2\n    } else if (annotation === S) {\n      this.u = u * this.size + this.size/2\n      this.v = v * this.size + this.size + this.lineWidth/13\n    }\n  }\n\n  draw(ctx) {\n    ctx.beginPath()\n    ctx.rect(this.u, this.v, this.length, this.length)\n    ctx.stroke()\n    ctx.closePath()\n  }\n}\n\nconst faces = []\nconst vertices = []\nconst edges = []\n\nfunction generatePuzzle(width, height) {\n\n  for (var u = 0; u < width; u++) {\n    for (var v = 0; v < height; v++) {\n      faces.push(new Face(u, v))\n      vertices.push(new Vertex(u, v))\n      edges.push(new Edge(u, v, W))\n      edges.push(new Edge(u, v, S))\n    }\n  }\n\n  for (var u = 0; u < width; u++) {\n    vertices.push(new Vertex(u, -1))\n    edges.push(new Edge(u, -1, S))\n  }\n\n  for (var v = 0; v < height; v++) {\n    vertices.push(new Vertex(width, v))\n    edges.push(new Edge(width, v, W))\n  }\n\n  vertices.push(new Vertex(width, -1))\n\n  faces.forEach(f => f.draw(backgroundCtx))\n  vertices.forEach(v => v.draw(backgroundCtx))\n  edges.forEach(e => e.draw(backgroundCtx))\n}\n\ngeneratePuzzle(3,3)\nsetInterval(draw, 10);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });