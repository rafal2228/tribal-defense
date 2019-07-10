import { Application, AnimatedSprite } from 'pixi.js';

const app = new Application();
const ORC_RESOURCE_URL = 'assets/orc.json';
app.loader.add(ORC_RESOURCE_URL).load(setup);
app.ticker.add(gameLoop);

app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
document.body.style.padding = '0';
document.body.style.margin = '0';
document.body.appendChild(app.view);

let orc: AnimatedSprite;

function setup() {
  const orcSheet = app.loader.resources[ORC_RESOURCE_URL];

  if (!orcSheet || !orcSheet.spritesheet) {
    return;
  }

  const orcAnimationKeyframes = [
    ...orcSheet.spritesheet.animations['orc'],
    ...orcSheet.spritesheet.animations['orc'].reverse()
  ];
  orc = new AnimatedSprite(orcAnimationKeyframes);
  orc.animationSpeed = 0.2;
  orc.loop = true;
  orc.play();
  app.stage.addChild(orc);
}

function gameLoop() {
  if (orc && orc.position.x < window.innerWidth - 100) {
    orc.position.set(orc.x + 5, 0);
  }
}
