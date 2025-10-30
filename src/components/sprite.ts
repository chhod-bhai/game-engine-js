export default class Sprite {
  topLeftX: number;
  topLeftY: number;
  bottomRightX: number;
  bottomRightY: number;

  constructor(
    topLeftX: number,
    topLeftY: number,
    bottomRightX: number,
    bottomRightY: number
  ) {
    this.topLeftX = topLeftX;
    this.topLeftY = topLeftY;
    this.bottomRightX = bottomRightX;
    this.bottomRightY = bottomRightY;
  }
}
