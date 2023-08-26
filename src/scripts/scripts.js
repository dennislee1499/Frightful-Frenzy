import MonsterManager from "./monsterManager.js";

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const monsterManager = new MonsterManager();

  let keys = {};

  document.addEventListener("keydown", function (event) {
    keys[event.code] = true;
  });

  document.addEventListener("keyup", function (event) {
    keys[event.code] = false;
  });

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
  let playerX = floorX + floorWidth / 2 - playerWidth / 2;
  let playerY = floorY + floorHeight / 2 - playerHeight / 2;
  let playerDirection = "right";
  const playerSpeed = 5;

  // drawing sprite on canvas
  function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
  }

  // animating game
  function animate() {
    // clear canvas for next frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();

    // draw sprite on canvas
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

    monsterManager.updateAll(floorX, floorWidth, floorY, floorHeight);
    monsterManager.drawAll(ctx);

    // creating animation effect
    playerFrameX = (playerFrameX + 1) % 4;

    requestAnimationFrame(animate);
  }

  function update() {
    if (keys["ArrowUp"]) {
      playerY -= playerSpeed;
      playerDirection = "up";
    } else if (keys["ArrowDown"]) {
      playerY += playerSpeed;
      playerDirection = "down";
    } else if (keys["ArrowLeft"]) {
      playerX -= playerSpeed;
      playerDirection = "left";
    } else if (keys["ArrowRight"]) {
      playerX += playerSpeed;
      playerDirection = "right";
    }

    boundaryChecks();
  }

  function boundaryChecks() {
    if (playerX + playerWidth > floorX + floorWidth) {
      playerX = floorX + floorWidth - playerWidth;
    }
    // Left boundary
    if (playerX < floorX) {
      playerX = floorX;
    }
    // Bottom boundary
    if (playerY + playerHeight > floorY + floorHeight) {
      playerY = floorY + floorHeight - playerHeight;
    }
    // Top boundary
    if (playerY < floorY) {
      playerY = floorY;
    }

    switch (playerDirection) {
      case "up":
        playerFrameY = 1;
        break;
      case "down":
        playerFrameY = 0;
        break;
      case "left":
        playerFrameY = 2;
        break;
      case "right":
        playerFrameY = 3;
        break;
    }
  }

  // triggers animation when player image is loaded
  images.player.onload = function () {
    animate();
  };

  // adjusts canvas size when window is resized
  window.addEventListener("resize", function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // recalculate floor position based off canvas size
    floorX = (canvas.width - floorWidth) / 2;
    floorY = (canvas.height - floorHeight) / 2;
  });

  setInterval(() => {
    monsterManager.spawnRandomMonster(floorX, floorWidth, floorY, floorHeight);
  }, 1000);
});
