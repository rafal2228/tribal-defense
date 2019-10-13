import { Application, Point } from 'pixi.js';
import { ORC_RESOURCE_URL } from './constants';
import { Orc } from './orc';

const app = new Application();
app.loader.add(ORC_RESOURCE_URL).load(setup);
app.ticker.add(gameLoop);

app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
document.body.style.padding = '0';
document.body.style.margin = '0';
document.body.appendChild(app.view);

let orc: Orc;

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
  orc.startWalking();

  app.stage.addChild(orc.sprite);
}

function gameLoop() {
  if (orc) {
    orc.update();
  }
}
