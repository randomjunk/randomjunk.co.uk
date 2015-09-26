//require("babel/polyfill");
import { images, initImages } from './images';
import { Sheep } from './Sheep';
import * as TWEEN from 'tween.js';

var fieldContents = [];
var fieldBounds = { x: 0, y: 0, w: 100, h: 100 };
var sheepCount = 15;

function initCanvas() {
  setCanvasSize();
  initImages();
  for ( let i = 0; i < sheepCount; i++ ) {
    let sheep = new Sheep(fieldBounds);
    fieldContents.push(sheep);
  }
  window.requestAnimationFrame(renderLoop);

  $(window).resize(() => {
    setCanvasSize();
    renderField();
  });
}

var lastTime = 0;
function renderLoop(currentTime) {
  TWEEN.update(currentTime);
  renderField();
  window.requestAnimationFrame(renderLoop);
}

function renderField() {
  var canvas = document.getElementById('sheep_canvas');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(images.landscape.image, 0, 0, canvas.width, canvas.height);

  let items = fieldContents.slice().sort((a, b) => a.y - b.y);
  items.forEach(item => item.render(ctx));
}

function setCanvasSize() {
  var canvas = document.getElementById('sheep_canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  fieldBounds.x = 0;
  fieldBounds.w = canvas.width;
  fieldBounds.y = canvas.height / 4;
  fieldBounds.h = canvas.height * 0.75;
  fieldBounds.maxX = canvas.width;
  fieldBounds.maxY = canvas.height;
}

$(document).ready(initCanvas);
