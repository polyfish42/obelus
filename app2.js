var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


let x = 300
let y = 300
let coords = [20,20];
let initialCoords = [0,0];

document.addEventListener("click", clickHandler, false)

function clickHandler(e) {
  initialCoords = [e.screenX, e.screenY]
  document.addEventListener("mousemove", mouseMoveHandler, false);
}

function mouseMoveHandler(e) {
  const newX = Math.abs(initialCoords[0] - e.screenX)
  const newY = Math.abs(initialCoords[1] - e.screenY)
  coords = [newX, newY]
  console.log(coords);
}

function circle() {
    ctx.beginPath();
    ctx.arc(coords[0],coords[1],5,0,2*Math.PI);
    ctx.strokeStyle= "black";
    ctx.stroke()
}

function obstacle() {

}

function draw() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    circle();
}


setInterval(draw, 10)
