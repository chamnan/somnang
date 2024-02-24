var canvas, context;
var maxx, maxy, halfx, halfy;
var rx, ry, cx, cy;
var scaleX, scaleY, invScaleX, invScaleY;
var grad;
var dotCount = 100;
var dots;

window.onload = function () {
  InitCanvas();
};

function InitCanvas() {
  maxx = document.documentElement.clientWidth;
  maxy = document.documentElement.clientHeight;
  halfx = maxx / 2;
  halfy = maxy / 2;
  rx = maxx / Math.sqrt(2);
  ry = maxy / Math.sqrt(2);
  cx = maxx / 2;
  cy = maxy / 2;
  rx = rx == 0 ? 0.25 : rx;
  ry = ry == 0 ? 0.25 : ry;

  canvas = document.getElementById("bgAnimation");
  canvas.width = maxx;
  canvas.height = maxy;
  context = canvas.getContext("2d");

  if (rx >= ry) {
    scaleX = 1;
    invScaleX = 1;
    scaleY = ry / rx;
    invScaleY = rx / ry;
    grad = context.createRadialGradient(
      cx,
      cy * invScaleY,
      0,
      cx,
      cy * invScaleY,
      rx
    );
  } else {
    scaleY = 1;
    invScaleY = 1;
    scaleX = rx / ry;
    invScaleX = ry / rx;
    grad = context.createRadialGradient(
      cx * invScaleX,
      cy,
      0,
      cx * invScaleX,
      cy,
      ry
    );
  }
  grad.addColorStop(0, "#000000");
  grad.addColorStop(1, "#0a1e38");

  // create dots
  dots = [];
  for (var i = 0; i < dotCount; i++) {
    dots.push(new dot());
  }
  // start animation
  render();
}

function resizeCanvas() {
  var myCanvas = document.getElementById("bgAnimation");
  myCanvas.width = document.documentElement.clientWidth;
  myCanvas.height = document.documentElement.clientHeight;
  InitCanvas();
}

// dots animation
function render() {
  context.fillStyle = grad;
  context.fillRect(0, 0, maxx, maxy);
  for (var i = 0; i < dotCount; i++) {
    dots[i].draw();
    dots[i].move();
  }
  requestAnimationFrame(render);
}

// dots class
// @constructor
function dot() {
  this.rad_x = 2 * Math.random() * halfx + 1;
  this.rad_y = 1.2 * Math.random() * halfy + 1;
  this.alpha = Math.random() * 360 + 1;
  this.speed = Math.random() * 100 < 50 ? 1 : -1;
  this.speed *= 0.1;
  this.size = Math.random() * 5 + 1;
  this.color = 250;
}

// drawing dot
dot.prototype.draw = function () {
  // calc polar coord to decart
  var dx = halfx + this.rad_x * Math.cos((this.alpha / 180) * Math.PI);
  var dy = halfy + this.rad_y * Math.sin((this.alpha / 180) * Math.PI);
  // set color
  context.fillStyle =
    "rgb(" + this.color + "," + this.color + "," + this.color + ")";
  // draw dot
  context.fillRect(dx, dy, this.size, this.size);
};

// calc new position in polar coord
dot.prototype.move = function () {
  this.alpha += this.speed;
  // change color
  if (Math.random() * 100 < 50) {
    this.color += 1;
  } else {
    this.color -= 1;
  }
};
