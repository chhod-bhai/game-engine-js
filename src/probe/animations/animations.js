var spriteSheet = new Image();
spriteSheet.src = "character.png";
var cnv = document.getElementById("animation-probe");
var ctx = cnv.getContext("2d");
var totalAnimationFrames = 4;
var renderedAnimationFrames = 0;
var activeAnimation = "walk_down";
var frameCnt = 0, staggerFrames = 15;
var animationMeta = {
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
var animations = ["walk", "pickup", "walkPick", "attack"];
var buildDropdown = function (output) {
    var dropdwn = document.getElementById("animation-select");
    dropdwn.value = activeAnimation;
    for (var _i = 0, _a = Object.keys(output); _i < _a.length; _i++) {
        var k = _a[_i];
        var item = document.createElement("option");
        item.setAttribute("value", k);
        item.innerText = k;
        dropdwn.appendChild(item);
    }
    dropdwn.addEventListener("change", function (e) {
        activeAnimation = e.target.value;
        totalAnimationFrames = output[activeAnimation].length;
        renderedAnimationFrames = 0;
        frameCnt = 0;
        ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, 128, 128);
    });
};
function buildOutput() {
    var output = {};
    for (var _i = 0, animations_1 = animations; _i < animations_1.length; _i++) {
        var animation = animations_1[_i];
        var sliceHeight = animationMeta.height;
        var animationToProcess = animationMeta[animation];
        // animation: {frames: , up, down left right: [{sx, sy, wx, wy}]}
        for (var i = 0; i < animationToProcess.order.length; i++) {
            var order = animationToProcess.order[i];
            var responseArr = [];
            for (var j = 0; j < animationToProcess.frames; j++) {
                responseArr.push({
                    sx: animationToProcess.startX + j * animationToProcess.width,
                    sy: animationToProcess.startY + i * sliceHeight,
                    w: animationToProcess.width,
                    h: sliceHeight,
                });
            }
            output["".concat(animation, "_").concat(order)] = responseArr;
        }
    }
    return output;
}
var output = buildOutput();
buildDropdown(output);
var gameLoop = function () {
    if (ctx) {
        ctx.clearRect(0, 0, 128, 128);
        var frameToDraw = output[activeAnimation][renderedAnimationFrames];
        ctx.drawImage(spriteSheet, frameToDraw.sx, frameToDraw.sy, frameToDraw.w, frameToDraw.h, 0, 0, 4 * frameToDraw.w, 4 * frameToDraw.h);
        frameCnt++;
        renderedAnimationFrames =
            Math.floor(frameCnt / staggerFrames) % totalAnimationFrames;
    }
    requestAnimationFrame(gameLoop);
};
requestAnimationFrame(gameLoop);
