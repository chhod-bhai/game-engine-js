const spriteSheet = new Image();
spriteSheet.src = "character.png";
const cnv = document.getElementById("animation-probe") as HTMLCanvasElement;
const ctx = cnv.getContext("2d");
let totalAnimationFrames = 4;
let renderedAnimationFrames = 0;
let activeAnimation = "walk_down";
let frameCnt = 0,
  staggerFrames = 15;

const animationMeta: Record<string, any> = {
  height: 32,
  walk: {
    frames: 4,
    startX: 0,
    startY: 0,
    width: 16,
    order: ["down", "right", "up", "left"],
  },
  pickup: {
    frames: 3,
    startX: 80,
    startY: 0,
    width: 16,
    order: ["down", "right", "up", "left"],
  },
  walkPick: {
    frames: 4,
    startX: 144,
    startY: 0,
    width: 16,
    order: ["down", "right", "up", "left"],
  },
  attack: {
    frames: 4,
    width: 32,
    startX: 0,
    startY: 128,
    order: ["down", "up", "right", "left"],
  },
};

const animations = ["walk", "pickup", "walkPick", "attack"];

const buildDropdown = (output: Record<string, any>) => {
  const dropdwn = document.getElementById(
    "animation-select"
  ) as HTMLSelectElement;
  dropdwn.value = activeAnimation;
  for (let k of Object.keys(output)) {
    const item = document.createElement("option");
    item.setAttribute("value", k);
    item.innerText = k;
    dropdwn.appendChild(item);
  }
  dropdwn.addEventListener("change", (e: Event) => {
    activeAnimation = (e.target as HTMLSelectElement).value;
    totalAnimationFrames = output[activeAnimation].length;
    renderedAnimationFrames = 0;
    frameCnt = 0;
    ctx?.clearRect(0, 0, 128, 128);
  });
};

function buildOutput() {
  let output: Record<string, any> = {};
  for (let animation of animations) {
    const sliceHeight = animationMeta.height;
    const animationToProcess = animationMeta[animation];
    // animation: {frames: , up, down left right: [{sx, sy, wx, wy}]}
    for (let i = 0; i < animationToProcess.order.length; i++) {
      const order = animationToProcess.order[i];
      let responseArr = [];
      for (let j = 0; j < animationToProcess.frames; j++) {
        responseArr.push({
          sx: animationToProcess.startX + j * animationToProcess.width,
          sy: animationToProcess.startY + i * sliceHeight,
          w: animationToProcess.width,
          h: sliceHeight,
        });
      }
      output[`${animation}_${order}`] = responseArr;
    }
  }
  return output;
}

const output = buildOutput();
buildDropdown(output);

const gameLoop = () => {
  if (ctx) {
    ctx.clearRect(0, 0, 128, 128);
    const frameToDraw = output[activeAnimation][renderedAnimationFrames];
    ctx.drawImage(
      spriteSheet,
      frameToDraw.sx,
      frameToDraw.sy,
      frameToDraw.w,
      frameToDraw.h,
      0,
      0,
      4 * frameToDraw.w,
      4 * frameToDraw.h
    );
    frameCnt++;
    renderedAnimationFrames =
      Math.floor(frameCnt / staggerFrames) % totalAnimationFrames;
    if (frameCnt > staggerFrames * totalAnimationFrames) {
      frameCnt = 0;
    }
  }

  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
