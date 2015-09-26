import { images } from './images';
import { Tween, Easing } from 'tween.js';

function r(n) {
  return Math.floor(Math.random() * n);
}

function prestart(tween, f) {
  let start = tween.start.bind(tween);
  tween.start = time => {
    f();
    return start(time);
  };
}

export class Sheep {
  constructor(fieldBounds) {
    this.animationProps = { location: {x: 0, y: 0}, sprite: { imageIndex: 0 } };
    this.direction = Math.random() > 0.5 ? 'right' : 'left';
    this.currentSprites = [images.sheep];
    this.fieldBounds = fieldBounds;
    this.size = { w: 100, h: 75 };
    this.location = {
      x: r(fieldBounds.w - this.size.w) + fieldBounds.x,
      y: r(fieldBounds.h - this.size.h) + fieldBounds.y
    };
    this.decideAction();
  }

  set location(location) {
    this.animationProps.location = location;
  }

  get y() { return this.animationProps.location.y; }
  get x() { return this.animationProps.location.x; }

  ensureY(y) {
    if (y < this.fieldBounds.y) return this.fieldBounds.y;
    if (y > this.fieldBounds.maxY - this.size.h) return this.fieldBounds.maxY - this.size.h;
    return y;
  }

  decideAction() {
    let action = r(8);
    switch (action) {
      case 0: return this.walkToRandomLocation();
      case 1: return this.stopABit();
      case 2: return this.walkToRandomLocation();
      case 3: return this.sleepABit();
      case 4: return this.walkToRandomLocation();
      case 5: return this.walkToRandomLocation();
      case 6: return this.walkToRandomLocation();
      case 7: return this.walkToRandomLocation();
    }
  }

  walkToRandomLocation() {
    const x = r(this.fieldBounds.w - this.size.w) + this.fieldBounds.x;
    const distance = x - this.x;
    const yShift = r(50) - 25;
    const y = this.ensureY(yShift + this.y);
    this.direction = distance > 0 ? "right" : "left";
    const time = (r(5) + 15) * Math.abs(distance);
    const spriteTween = new Tween(this.animationProps.sprite)
      .to({ imageIndex: [0,1,2,3,4,5,6] }, 400)
      .repeat(Infinity)
      .start();
    const tween = new Tween(this.animationProps.location)
      .to({x, y}, time)
      .easing(Easing.Sinusoidal.InOut)
      .onComplete(() => {
        setTimeout(() => {
          spriteTween.stop();
          this.decideAction();
        });
      })
      .start();
    this.currentSprites = images.walkingSheep;
  }

  stopABit() {
    this.currentSprites = images.walkingSheep;
    this.animationProps.sprite.imageIndex = 2;
    setTimeout(() => {
      this.decideAction();
    }, r(1000));
  }

  sleepABit() {
    let lieDown = new Tween(this.animationProps.sprite)
      .to({ imageIndex: [0,1,2,3] }, 200)
      .onStart(() => {
        this.currentSprites = images.fallOver;
        this.animationProps.sprite.imageIndex = 0;
      })
    let sleep = new Tween(this.animationProps.sprite)
      .to({ imageIndex: [0,1,2] }, 1200)
      .repeat(r(20) + 10);
    prestart(sleep, () => {
      this.animationProps.sprite.imageIndex = 0;
      this.currentSprites = images.sleeping;
    });
    let getUp = new Tween(this.animationProps.sprite)
      .to({ imageIndex: [3,2,1,0] }, 200)
      .onComplete(() => setTimeout(() => this.decideAction()));
    prestart(getUp, () => {
        this.currentSprites = images.fallOver;
        this.animationProps.sprite.imageIndex = 3;
      })

    lieDown.chain(sleep.chain(getUp)).start();
  }

  render(ctx) {
    var { location: { x, y }, sprite: { imageIndex } } = this.animationProps;
    var flip = this.direction == "left";
    var image = this.currentSprites[Math.round(imageIndex)];
    if (image && image.draw)
      image.draw(ctx, x, y, flip);
    else { console.log(Math.round(imageIndex), image, this.currentSprites); }
  }
}
