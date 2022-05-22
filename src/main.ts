import "phaser";
import { Plane } from "./plane";

// let plane: Phaser.GameObjects.Image;

let planes: Plane;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
let model: Phaser.GameObjects.Image;

let WIDTH = 1080;
let HEIGHT = 720;

export default class Demo extends Phaser.Scene {
  constructor() {
    super("demo");
  }

  preload() {
    this.load.image("plane", "assets/plane2.png");
  }

  create() {
    model = this.add.image(0, 0, "plane");
    model.setScale(0.1, 0.1);
    planes = new Plane(model);

    cursors = this.input.keyboard.createCursorKeys();
  }

  update(): void {
    if (cursors.left.isDown) {
      planes.onKey("A");
    }
    if (cursors.right.isDown) {
      planes.onKey("D");
    }
    if (cursors.up.isDown) {
      planes.onKey("W");
    }
    if (cursors.down.isDown) {
      planes.onKey("S");
    }

    planes.update();
    planes.draw();
    model.x = ((model.x % WIDTH) + WIDTH) % WIDTH;
    model.y = ((model.y % HEIGHT) + HEIGHT) % HEIGHT;
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#eee",
  width: WIDTH,
  height: HEIGHT,
  scene: Demo,
};

new Phaser.Game(config);
