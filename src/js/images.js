
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

const seq = (name, w, h, n) => {
  let s = [];
  for (let i = 0; i < n; i++) {
    s.push(new Image(name+"_f"+(i+1), w, h));
  }
  return s;
}

export function initImages() {
  images.landscape = new Image('landscape', 1280, 768);
  images.walkingSheep = seq('sheep', 100, 75, 7);
  images.fallOver = seq('sheep_lie', 100, 75, 4);
  images.sleeping = seq('sheep_sleep', 100, 75, 3);
  images.sheep = images.walkingSheep[0];
}
