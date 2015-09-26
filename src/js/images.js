
class Image {
  constructor(name, w, h) {
    this.name = name;
    this.image = document.getElementById(name);
    this.w = w;
    this.h = h;
  }

  draw(ctx, x, y, flip) {
    if (flip) {
      ctx.save();
      ctx.translate(x + this.w, y);
      ctx.scale(-1, 1);
      ctx.drawImage(this.image, 0, 0, this.w, this.h);
      ctx.restore();
    } else {
      ctx.drawImage(this.image, x, y, this.w, this.h);
    }
  }
}

export const images = {};

export function initImages() {
  images.landscape = new Image('landscape', 1280, 768);
  images.sheep = new Image('sheep', 100, 75);
}
