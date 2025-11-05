const cnv = document.getElementById("motion-container");
const ctx = cnv.getContext("2d");

const buttonState = {
  w: false,
  a: false,
  s: false,
  d: false,
};

window.addEventListener("keydown", (e) => {
  if (Object.keys(buttonState).includes(e.key)) {
    buttonState[e.key] = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (Object.keys(buttonState).includes(e.key)) {
    buttonState[e.key] = false;
  }
});

const v = 5;

const velocityMaps = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
};

const renderCircleAt = (x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
};

const circlePos = {
  x: 10,
  y: 10,
};

const boundCirclePosition = () => {
  if (circlePos.x < 10) circlePos.x = 10;
  if (circlePos.x > 290) circlePos.x = 290;
  if (circlePos.y < 10) circlePos.y = 10;
  if (circlePos.y > 140) circlePos.y = 140;
};

const velocity = 2;

const gameLoop = () => {
  // update position
  for (let k in velocityMaps) {
    if (buttonState[k]) {
      const [fx, fy] = velocityMaps[k];
      circlePos.x += fx * velocity;
      circlePos.y += fy * velocity;
    }
  }
  boundCirclePosition();

  // render
  ctx.clearRect(0, 0, 300, 150);

  renderCircleAt(circlePos.x, circlePos.y);

  // repeat
  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
