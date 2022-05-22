export class Vec2 {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  len2() {
    return this.x * this.x + this.y * this.y;
  }

  len() {
    return Math.sqrt(this.len2());
  }

  add(other: Vec2) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  mul(other: number) {
    this.x *= other;
    this.y *= other;
    return this;
  }

  clone() {
    return new Vec2(this.x, this.y);
  }

  arg() {
    return Math.atan2(this.y, this.x);
  }

  static fromArg(r: number) {
    return new Vec2(Math.cos(r), Math.sin(r));
  }
}

export function sum(...v: Vec2[]) {
  let ret = new Vec2(0, 0);
  v.forEach((vi) => {
    ret.add(vi);
  });
  return ret;
}
