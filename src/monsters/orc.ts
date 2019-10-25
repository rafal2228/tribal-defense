import { AnimatedSprite, Application, Point } from 'pixi.js';
import { Behaviour } from '../behaviours/behaviour';
import { WalkBehaviour } from '../behaviours/walk';
import { ORC_RESOURCE_URL } from '../constants';

export class Orc {
  sprite: AnimatedSprite;
  speed = 2;
  behaviour: Behaviour;

  constructor(app: Application, journey: Point[] = []) {
    const orcSheet = app.loader.resources[ORC_RESOURCE_URL];

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

    this.behaviour = new WalkBehaviour(journey, this.sprite, this.speed);

    if (this.behaviour.init) {
      this.behaviour.init();
    }
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
