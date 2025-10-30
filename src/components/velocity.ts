import type { Component } from "./types.js";

export default class Velocity implements Component {
  vx = 0;
  vy = 0;
  constructor(vx: number, vy: number) {
    this.vx = vx;
    this.vy = vy;
  }
}
