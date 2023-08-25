const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// set up dimension of canvas to match window
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const floorWidth = 1300;
const floorHeight = 665.55;
const floorX = (canvas.width - 1300) / 2;
const floorY = (canvas.height - 665.55) / 2;

// create object to load and store image resource
const images = {};
images.player = new Image();
images.player.src = "images/Hero.png";

// player variables
const playerWidth = 95;
const playerHeight = 95;
let playerFrameX = 3;
let playerFrameY = 3;
let playerX = floorX;
let playerY = 47;
const playerSpeed = 7;

// drawing sprite on canvas
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let nextPlayerX = playerX + playerSpeed;

  if (nextPlayerX + playerWidth > floorX + floorWidth) {
    nextPlayerX = floorX - playerWidth;
  }
  if (nextPlayerX < floorX) {
    nextPlayerX = floorX + floorWidth - playerWidth;
  }
  playerX = nextPlayerX;


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

  // creating animation effect
  playerFrameX = (playerFrameX + 1) % 4;

  requestAnimationFrame(animate);
}


images.player.onload = function () {
  animate();
};

window.addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  floorX = (canvas.width - floorWidth) / 2;
  floorY = (canvas.height = floorHeight) / 2;
});

console.log("Floor X:", floorX);
console.log("Player Start X:", playerX);

