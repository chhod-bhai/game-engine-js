const fixedDeltaTime = 1 / 25;
let accumulator = 0;
let lastTime = performance.now();
let gameEnded = false;

const cnv = document.getElementById("game-screen");
const ctx = cnv.getContext("2d");

const circleState = {
  radius: 10,
  currentX: 10,
  currentY: 10,
  prevX: 10,
  prevY: 10,
  velocity: 100,
};

const updateGame = function (fixedDeltaTime) {
  // when circle reaches the end of canvas , game is over, we need to return
  if (circleState.currentX >= cnv.width - 10) {
    gameEnded = true;
    return;
  }

  circleState.prevX = circleState.currentX;
  circleState.prevY = circleState.currentY;
  circleState.currentX += circleState.velocity * fixedDeltaTime;
};

const render = function (interpolation) {
  // clear the screen and paint the circle at the updated location
  // use interpolation for smoother transitions
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  ctx.beginPath();
  ctx.arc(
    circleState.currentX +
      (circleState.currentX - circleState.prevX) * interpolation,
    circleState.currentY,
    circleState.radius,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = "red";
  ctx.fill();
};

const gameLoop = function (currentTime) {
  if (gameEnded) return;

  const deltaTimeSecs = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  accumulator += deltaTimeSecs;

  // This avoids slowly increasing number of updates , thus eventually crashing the game
  // more updates mean more delta times per frame.. eventually leading to lots of update calls
  // leading to eventual complete halt
  if (deltaTimeSecs > 0.2) {
    deltaTimeSecs = 0.2;
  }

  // when FPS drops below 60 , you might need to update game more per frame
  // so as to catchup to the correct position
  while (accumulator >= fixedDeltaTime) {
    updateGame(fixedDeltaTime);
    accumulator -= fixedDeltaTime;
  }

  // If there are more render calls that can be made due to FPS being super high
  // We start to predict the rendered position
  // Game updates still happen at fixed
  render(accumulator / fixedDeltaTime);
  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
