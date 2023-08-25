const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const images = {};
images.player = new Image();
images.player.src = "images/Hero.png";

const playerWidth = 256;
const playerHeight = 256;
let playerFrameX = 0;
let playerFrameY = 0;
let playerX = 0;
let playerY = 0;
const playerSpeed = 6;

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSprite(
    images.player,
    playerWidth * playerFrameX,
    playerHeight * playerFrameY,
    playerWidth,
    playerHeight,
    playerX,
    playerY,
    playerWidth,
    playerHeight
  );

  playerFrameX = (playerFrameX + 1) % 4;

  if (playerX < canvas.width + playerWidth) {
    playerX += playerSpeed;
  } else {
    playerX = 0 - playerWidth;
  }

  requestAnimationFrame(animate);
}

images.player.onload = function () {
  animate();
};

window.addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

