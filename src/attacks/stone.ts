import { AnimatedSprite, Application, Point } from 'pixi.js';
import { Behaviour } from '../behaviours/behaviour';
import { FlyBehaviour } from '../behaviours/fly';
import { STONE_RESOURCE_URL } from '../constants';

export class Stone {
  sprite: AnimatedSprite;
  speedX = 10;
  speedY = 10;
  behaviour: Behaviour;

  constructor(app: Application, initialPosition: Point, target: Point) {
    const sheet = app.loader.resources[STONE_RESOURCE_URL];
    const keyframes =
      sheet.spritesheet && sheet.spritesheet.animations['stone'];
    this.sprite = new AnimatedSprite(keyframes);

    this.sprite.animationSpeed = 0.2;
    this.sprite.loop = false;
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.setTransform(initialPosition.x, initialPosition.y);

    this.behaviour = new FlyBehaviour(
      this.sprite,
      initialPosition,
      target,
      this.speedX,
      this.speedY
    );
  }

  update() {
    const behaviour = this.behaviour.update();

    if (behaviour) {
      if (this.behaviour.dispose) {
        this.behaviour.dispose();
      }

      if (behaviour.init) {
        behaviour.init();
      }

      this.behaviour = behaviour;
    }
  }
}
