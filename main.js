const fixedDeltaTime = 1 / 60;
let accumulator = 0;
let lastTime = performance.now();

const updateGame = function (fixedDeltaTime) {
  // update the game state from previous state to the next state
};

const render = function (interpolation) {
  // paint the updated state of the game on the canvas
};

const gameLoop = function (currentTime) {
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
  // Game updates still happen at 60 FPS
  render(accumulator / fixedDeltaTime);
  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
