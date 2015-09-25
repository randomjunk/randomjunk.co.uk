
import { images, initImages } from './images';

function initCanvas() {
  setCanvasSize();
  initImages();

  window.requestAnimationFrame(renderField);

  $(window).resize(() => {
    setCanvasSize();
    renderField();
  });
}

function renderField() {
  var canvas = document.getElementById('sheep_canvas');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(images.landscape.image, 0, 0, canvas.width, canvas.height);
  images.sheep.draw(ctx, 200, 400);
  images.sheep.draw(ctx, 300, 400);
  images.sheep.draw(ctx, 400, 400);
  images.sheep.draw(ctx, 300, 475, true);
}

function setCanvasSize() {
  var canvas = document.getElementById('sheep_canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

$(document).ready(initCanvas);
