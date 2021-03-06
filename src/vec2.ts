export function dot(lhs: Vec2, rhs: Vec2) {
  return lhs.x * rhs.x + lhs.y * rhs.y;
}

export function cross(lhs: Vec2, rhs: Vec2) {
  return lhs.x * rhs.y - lhs.y * rhs.x;
}

export function cos(lhs: Vec2, rhs: Vec2) {
  return dot(lhs, rhs) / lhs.len() / rhs.len();
}

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

  rotate(r: number) {
    let s = Math.sin(r);
    let c = Math.cos(r);
    let tx = this.x;
    let ty = this.y;
    this.x = c * tx - s * ty;
    this.y = s * tx + c * ty;
    return this;
  }

  static fromArg(r: number) {
    return new Vec2(Math.cos(r), Math.sin(r));
  }

  toString() {
    return `{ x = ${this.x}, y = ${this.y} }`;
  }

  projection(other: Vec2) {
    return this.mul(dot(this, other));
  }
  i() {
    return Vec2.fromArg(this.arg());
  }
}

export function sum(...v: Vec2[]) {
  let ret = new Vec2(0, 0);
  v.forEach((vi) => {
    ret.add(vi);
  });
  return ret;
}
