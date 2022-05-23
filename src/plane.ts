import { sum, Vec2 } from "./vec2";

const I = 0.002;
const PI = Math.PI;
// const M = 1;

let Gravity = new Vec2(0, -I * 9.8);
let cnt = 0;

export class Plane {
  public pos: Vec2;
  public v: Vec2;
  public dir: number;
  public pushing: number;

  model: Phaser.GameObjects.Image;
  constructor(model: Phaser.GameObjects.Image) {
    this.pos = new Vec2(120, 400);
    this.v = new Vec2(.1, .2);
    this.dir = 0;
    this.pushing = 0;
    this.model = model;
  }
  update() {
    let v0 = this.v.len();
    // let arg = this.v.arg();
    // let vdir = Vec2.fromArg(this.dir);

    let drag = this.v.clone().mul(-v0 * I * .8);

    let lifting = Vec2.fromArg(PI / 2 - PI / 5)
      .mul(v0 * v0 * I * .5);
    if (lifting.y < 0) {
      lifting.mul(-1);
    }

    let F = Vec2.fromArg(-this.dir)
      .mul(I * 40)
      .mul(this.pushing);

    this.pushing = 0;
    cnt += 1;
    if (cnt % 60 == 0) {
      console.log(
        `G = ${Gravity} | F = ${F} | drag = ${drag} | lifting = ${lifting}`
      );
    }

    this.v = sum(Gravity, this.v, drag, F, lifting);

    this.pos = sum(this.pos, this.v);

    // this.dir -= (this.dir - this.v.arg()) * I
  }
  draw() {
    this.model.x = this.pos.x;
    this.model.y = -this.pos.y;
    this.model.rotation = this.dir;
  }

  onKey(key: string) {
    // console.log(key);

    if (key === "W") {
      this.pushing = 1;
    }
    if (key === "S") {
      this.pushing = -0.5;
    }
    if (key === "A") {
      this.dir -= PI / 100;
    }
    if (key === "D") {
      this.dir += PI / 100;
    }
  }
}
