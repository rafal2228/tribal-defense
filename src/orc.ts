import { Application, AnimatedSprite, Point } from 'pixi.js';
import { ORC_RESOURCE_URL, MonsterState } from './constants';

export class Orc {
  sprite: AnimatedSprite;
  maxSpeed = 10;
  speed = 2;
  states: Set<MonsterState> = new Set();
  currentTargetIndex?: number;
  journey: Point[];

  constructor(app: Application, journey: Point[] = []) {
    const orcSheet = app.loader.resources[ORC_RESOURCE_URL];
    this.journey = journey;

    const orcAnimationKeyframes = [
      ...(orcSheet.spritesheet && orcSheet.spritesheet.animations['orc']),
      ...(orcSheet.spritesheet &&
        orcSheet.spritesheet.animations['orc'].reverse())
    ];

    this.sprite = new AnimatedSprite(orcAnimationKeyframes);
    this.sprite.animationSpeed = 0.2;
    this.sprite.loop = true;
    this.sprite.anchor.set(0.5, 0.5);

    this.sprite.position.copyFrom(journey[0]);
    this.states.add(MonsterState.Idle);
  }

  update() {
    if (this.states.has(MonsterState.Walking)) {
      this.walk();
    }
  }

  startWalking() {
    if (this.journey.length < 1) {
      return;
    }

    this.states.delete(MonsterState.Idle);
    this.states.add(MonsterState.Walking);
    this.currentTargetIndex = 0;
    this.sprite.play();
  }

  walk() {
    if (typeof this.currentTargetIndex !== 'number') {
      return;
    }

    if (this.currentTargetIndex === this.journey.length) {
      this.states.delete(MonsterState.Walking);
    }

    const currentTarget = this.journey[this.currentTargetIndex];

    if (!currentTarget) {
      return;
    }

    const { x: targetX, y: targetY } = currentTarget;
    const { x, y } = this.sprite;

    if (targetX === x && targetY === y) {
      this.currentTargetIndex++;
      return;
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

      return;
    }

    if (targetY === y) {
      const maxX = Math.abs(x - targetX);

      this.sprite.setTransform(
        this.sprite.x + (maxX > this.speed ? this.speed : maxX) * directionX,
        this.sprite.y,
        directionX
      );

      return;
    }

    const maxX = Math.abs(x - targetX);
    const maxY = Math.abs(y - targetY);
    const maxPath = Math.hypot(maxX, maxY);

    if (maxPath < this.speed) {
      this.sprite.setTransform(targetX, targetY, directionX);
      return;
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
  }
}
