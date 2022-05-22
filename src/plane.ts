import { sum, Vec2 } from "./vec2";

let I = 0.01;

let Gravity = new Vec2(0, -I * 9.8);

export class Plane {
  public pos: Vec2;
  public v: Vec2;
  public dir: number;
  public pushing: boolean;

  model: Phaser.GameObjects.Image;
  constructor(model: Phaser.GameObjects.Image) {
    this.pos = new Vec2(120, 200);
    this.v = new Vec2(-1, 2);
    this.dir = 0;
    this.pushing = false;
    this.model = model;
  }
  update() {
    let v0 = this.v.len();
    
    let drag = this.v.clone().mul(-v0 * I * 0.3);

    let dv = Gravity;

    let F = new Vec2(0, 0);
    if (this.pushing) {
        F = Vec2.fromArg(-this.dir).mul(I * 30);
        this.pushing = false;
    }


    this.v = sum(dv, this.v, drag, F);

    this.pos = sum(this.pos, this.v);
  }
  draw() {
    this.model.x = this.pos.x;
    this.model.y = -this.pos.y;
    this.model.rotation = this.dir;
  }

  onKey(key: string) {
    console.log(key);

    if (key === "W") {
      this.pushing = true;
    }
    // if (key === "S") {
    //   this.v.y += 1;
    // }
    if (key === "A") {
      this.dir -= Math.PI / 100;
    }
    if (key === "D") {
        this.dir += Math.PI / 100;
    }
  }
}
