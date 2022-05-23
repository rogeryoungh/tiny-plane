import { dot, sum, Vec2 } from "./vec2";
import { HEIGHT } from "./const";

const I = 12;
const PI = Math.PI;
const k0 = 8;
const k1 = 6e-2;
const k2 = 1e-2;
const dt = 1 / 60;
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
    this.v = new Vec2(0.1, 0.2);
    this.dir = 0;
    this.pushing = 0;
    this.model = model;
  }
  update() {
    let u = Vec2.fromArg(this.dir);
    let u2 = u.clone().rotate(-PI / 2);

    let du1 = dot(this.v, u);
    let drag = u.clone().mul(-du1 * Math.abs(du1) * k2);
    drag.mul(0);

    let du2 = dot(this.v, u2);
    let lifting = u2.clone().mul(-du2 * Math.abs(du2) * k1);

    let F = Vec2.fromArg(this.dir)
      .mul(I * k0)
      .mul(this.pushing);

    this.pushing = 0;
    cnt += 1;
    if (cnt % 120 == 0) {
      console.clear();
      console.log(
        `G = ${Gravity} | F = ${F} | drag = ${drag} | lifting = ${lifting}`
      );
      console.log(`dir = ${this.dir}`);
      console.log(`v = ${this.v}`);
      console.log(`u = ${u} | u2 = ${u2}`);
      console.log(`du = ${du1} | du2 = ${du2}`);
      console.log(`lif_dir = ${Vec2.fromArg(-this.dir).rotate(PI / 2)}`);
    }

    this.v = sum(Gravity, drag, F, lifting).mul(dt).add(this.v);

    this.pos = this.v.clone().mul(dt).add(this.pos);
  }
  draw() {
    // if (this.pos.x < 0) {
    //   this.pos.x = 0;
    //   this.v.x *= -1;
    // }
    // if (this.pos.x > WIDTH) {
    //   this.pos.x = WIDTH;
    //   this.v.x *= -1;
    // }
    if (this.pos.y <= 10) {
      this.pos.y = 10;
      this.v.y *= -0.5;
      this.v.x *= 0.995;
    }
    if (this.pos.y > HEIGHT) {
      this.pos.y = HEIGHT;
      this.v.y *= -0.5;
      this.v.x *= 0.995;
    }
    this.model.x = this.pos.x;
    this.model.y = -this.pos.y;
    this.model.rotation = -this.dir;
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
      this.dir += PI / 100;
    }
    if (key === "D") {
      this.dir -= PI / 100;
    }
  }
}
