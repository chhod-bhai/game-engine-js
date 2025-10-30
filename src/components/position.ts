import type { Component } from "./types.js";

export class Position implements Component {
  x = 0;
  y = 0;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
