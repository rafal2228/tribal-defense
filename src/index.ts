import { Application, Point } from 'pixi.js';
import { ORC_RESOURCE_URL, STONE_RESOURCE_URL } from './constants';
import { Orc } from './monsters/orc';
import { Stone } from './attacks/stone';

const app = new Application();
app.loader
  .add(ORC_RESOURCE_URL)
  .add(STONE_RESOURCE_URL)
  .load(setup);

app.ticker.add(gameLoop);

app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
document.body.style.padding = '0';
document.body.style.margin = '0';
document.body.appendChild(app.view);

let orc: Orc;
let stone: Stone;

function setup() {
  orc = new Orc(app, [
    new Point(70, 70),
    new Point(100, 70),
    new Point(200, 135),
    new Point(300, 70),
    new Point(400, 70),
    new Point(400, 400),
    new Point(70, 70)
  ]);

  stone = new Stone(app, new Point(400, 400), new Point(200, 400));

  app.stage.addChild(orc.sprite);
  app.stage.addChild(stone.sprite);
}

function gameLoop() {
  if (orc) {
    orc.update();
  }

  if (stone) {
    stone.update();
  }
}
