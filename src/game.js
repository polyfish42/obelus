import Puzzle from './puzzle';
import Line from './line';
import Cursor from './cursor';
import checkIfWon from './win_check';
import puzzles from './puzzles';
import {
  N,
  W,
  BLACK_SQUARE,
  WHITE_SQUARE
} from './coordinate_system';

let puzzleCtx;
let animateCtx;
let line;
let puzzle;
let puzzleDiv;
let cursor;
let lineInterval;
let animateEndNub;

const sizeCanvases = (width, height) => {
  const puzzleDiv = document.getElementById("puzzle");
  puzzleDiv.setAttribute("style", `height:${height * 100 + 67.5}px; width: ${width * 100 + 67.5}px`);

  const puzzleCanvas = document.getElementById("puzzleCanvas");
  puzzleCanvas.setAttribute("style", `height:${height * 100 + 67.5}px; width: ${width * 100 + 67.5}px`);
  puzzleCanvas.setAttribute("height", `${height * 200 + 135}px`);
  puzzleCanvas.setAttribute("width", `${width * 200 + 135}px`);

  const lineCanvas = document.getElementById("lineCanvas");
  lineCanvas.setAttribute("style", `height:${height * 100 + 67.5}px; width: ${width * 100 + 67.5}px`);
  lineCanvas.setAttribute("height", `${height * 200 + 135}px`);
  lineCanvas.setAttribute("width", `${width * 200 + 135}px`);
};

const getCtx = (id) => {
  return document.getElementById(id).getContext("2d");
};

const makePuzzle = (start, end, height, width, squares) => {
  sizeCanvases(height, width);
  puzzleCtx = getCtx("puzzleCanvas");
  animateCtx = getCtx("lineCanvas");

  puzzle = new Puzzle(height, width);
  line = new Line(start[0], start[1], puzzle.vertices, puzzle.edges);
  cursor = new Cursor(lineCanvas, line);
  animateEndNub = puzzle.animateEndNub(animateCtx);


  puzzle.setStart(...start);
  puzzle.setEnd(...end);

  squares.forEach(sq => puzzle.faces[sq[0]].inside = sq[1]);
  puzzle.draw(puzzleCtx);
};

export const drawFrame = () => {
  let showErrorSwitch = 0

  return () => {
    animateCtx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
    if (line.lineOn === true && line.atEnd === false) {
      animateEndNub();
    }
    line.draw(animateCtx);

    if (showErrorSwitch > 15) {
      puzzle.flashErrors(animateCtx);
    }

    showErrorSwitch = showErrorSwitch > 30 ? 0 : showErrorSwitch + 1;
  };
};

const makeLevels = level => {
  const ctx = document.getElementById("levels").getContext("2d");
  ctx.clearRect(0, 0, 500, 500);

  for (var i = 0; i < 10; i++) {
    ctx.beginPath();

    if (i + 1 < level) {
      ctx.fillStyle = "yellow";
    } else {
      ctx.fillStyle = "rgba(255,255,255,0.5)";
    }
    ctx.arc(i * 18 + 15, 20, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
};

let level = 1;
makePuzzle(...puzzles[level]);
makeLevels(level);
setInterval(drawFrame(), 10);

export const isGameWon = () => {
  const isWon = checkIfWon(line, puzzle);
  const puzzleDiv = document.getElementById("puzzle");

  if (!isWon) return;

  if (level === 10) {
    resetGame();
  } else {
    level++;
    makePuzzle(...puzzles[level]);
    makeLevels(level);
  }

};

const drawWinScreen = () => {
  alert("You win! Click to play again");
};

const resetGame = () => {
  drawWinScreen()
  level = 1;
  makePuzzle(...puzzles[level]);
  makeLevels(level);
};
