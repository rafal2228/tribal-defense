import { Behaviour } from './behaviour';
import { AnimatedSprite, Point } from 'pixi.js';

export class FlyBehaviour implements Behaviour {
  sprite: AnimatedSprite;
  speedX: number;
  speedY: number;
  initialPosition: Point;
  target: Point;

  constructor(
    sprite: AnimatedSprite,
    initialPosition: Point,
    target: Point,
    speedX: number,
    speedY: number
  ) {
    this.sprite = sprite;
    this.initialPosition = initialPosition;
    this.target = target;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update() {
    const maxX = Math.max(this.initialPosition.x, this.target.x);
    const minX = Math.min(this.initialPosition.x, this.target.x);
    const progress = (this.sprite.x - minX) / (maxX - minX);
    const changeY = progress < 0.5 ? 1 : -1;

    this.sprite.setTransform(
      Math.max(this.sprite.x + this.speedX * changeY, this.target.x),
      this.sprite.y - this.speedY * changeY
    );

    return null;
  }
}
