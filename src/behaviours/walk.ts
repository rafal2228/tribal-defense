import { AnimatedSprite, Point } from 'pixi.js';
import { Behaviour } from './behaviour';
import { StandBehaviour } from './stand';

export class WalkBehaviour implements Behaviour {
  currentTargetIndex?: number;
  sprite: AnimatedSprite;
  journey: Point[];
  speed: number;

  constructor(journey: Point[], sprite: AnimatedSprite, speed: number) {
    this.journey = journey;
    this.sprite = sprite;
    this.speed = speed;
  }

  init() {
    if (this.journey.length < 1) {
      return;
    }

    this.currentTargetIndex = 0;
    this.sprite.play();
  }

  update() {
    if (typeof this.currentTargetIndex !== 'number') {
      return new StandBehaviour();
    }

    if (this.currentTargetIndex === this.journey.length) {
      return new StandBehaviour();
    }

    const currentTarget = this.journey[this.currentTargetIndex];

    if (!currentTarget) {
      return new StandBehaviour();
    }

    const { x: targetX, y: targetY } = currentTarget;
    const { x, y } = this.sprite;

    if (targetX === x && targetY === y) {
      this.currentTargetIndex++;

      return null;
    }

    const directionX = targetX < x ? -1 : 1;
    const directionY = targetY < y ? -1 : 1;

    if (targetX === x) {
      const maxY = Math.abs(y - targetY);

      this.sprite.setTransform(
        this.sprite.x,
        this.sprite.y + (maxY > this.speed ? this.speed : maxY) * directionY,
        directionX
      );

      return null;
    }

    if (targetY === y) {
      const maxX = Math.abs(x - targetX);

      this.sprite.setTransform(
        this.sprite.x + (maxX > this.speed ? this.speed : maxX) * directionX,
        this.sprite.y,
        directionX
      );

      return null;
    }

    const maxX = Math.abs(x - targetX);
    const maxY = Math.abs(y - targetY);
    const maxPath = Math.hypot(maxX, maxY);

    if (maxPath < this.speed) {
      this.sprite.setTransform(targetX, targetY, directionX);
      return null;
    }

    const pathSqrt = Math.pow(this.speed, 2);
    const changeY = Math.sqrt(
      pathSqrt / (Math.pow(Math.tan(maxX / maxY), 2) + 1)
    );
    const changeX = Math.sqrt(pathSqrt - Math.pow(changeY, 2));

    this.sprite.setTransform(
      this.sprite.x + changeX * directionX,
      this.sprite.y + changeY * directionY,
      directionX
    );

    return null;
  }

  dispose() {
    this.sprite.gotoAndStop(0);
  }
}
