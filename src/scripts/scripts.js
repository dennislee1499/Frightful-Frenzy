import MonsterManager from "./monsterManager.js";
import { checkCollision } from "./collision.js";


document.addEventListener("DOMContentLoaded", function () {
  let floor = document.querySelector(".floor"); //////////
  floor.style.display = "none"; //////////

  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let monsterSpawnInterval;
  let keys = {};
  let score = 0; //
  const scoreTextSize = 30; //
  let lastUpdateTime = Date.now(); //
  const scoreIncreaseInterval = 100; //
  let isGameOver = false;
  let isGameRunning = false;
  const monsterManager = new MonsterManager();

  const floorWidth = 1300;
  const floorHeight = 665.55;
  let floorX;
  let floorY;

  const playerWidth = 95;
  const playerHeight = 95;
  const buffer = 40; 
  let playerX;
  let playerY;
  let playerFrameX = 3;
  let playerFrameY = 3;
  const playerSpeed = 7;
  let playerDirection = "right";

    // document
    //   .getElementById("startGameButton")
    //   .addEventListener("click", function () {
    //     document.getElementById("instructionsOverlay").style.display = "none";
    //     floor.style.display = "block"; 
    //     initializeGame();
    //   });



  document.addEventListener("keydown", function (event) {
    keys[event.code] = true;
    if (event.code === "KeyR" && isGameOver) {
      initializeGame();
    }
  });

  document.addEventListener("keyup", function (event) {
    keys[event.code] = false;
  });

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  floorX = (canvas.width - 1300) / 2;
  floorY = (canvas.height - 665.55) / 2;

  const images = {};
  images.player = new Image();
  images.player.src = "images/Hero.png";

  images.background = new Image();
  images.background.src = "images/background.jpg"

  images.canvasBackground = new Image();
  images.canvasBackground.src = "images/canvas_background.jpg"

  playerX = floorX + floorWidth / 2 - playerWidth / 2;
  playerY = floorY + floorHeight / 2 - playerHeight / 2;

  function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
  }

  function updateScoreDisplay() {
    document.getElementById("scoreOverlay").innerText = `Score: ${score}`;
  }

  function animate() {
    if (!isGameRunning) return;

    if (!isGameOver) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(images.canvasBackground, 0, 0, canvas.width, canvas.height);

      ctx.drawImage(images.background, floorX, floorY, floorWidth, floorHeight); ////////
      update();

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
      playerFrameX = (playerFrameX + 1) % 4;
    } else {
      gameOver();
    }

    requestAnimationFrame(animate);
  }

  function update() {
    let currentTime = Date.now(); //
    if (currentTime - lastUpdateTime >= scoreIncreaseInterval) {
      score++;
      lastUpdateTime = currentTime;
      updateScoreDisplay(); ////////
    } //////////////
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
  for (const monster of monsterManager.monsters) {
      if (checkCollision ({
        x: playerX + buffer,
        y: playerY + buffer,
        width: playerWidth - (buffer * 2),
        height: playerHeight - (buffer * 2),
      }, monster)) {
        gameOver();
        return;
      }
    }
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

  function gameOver() {
    if (monsterSpawnInterval) {
      clearInterval(monsterSpawnInterval);
    }
    isGameOver = true;
    isGameRunning = false;
    const text = "Game Over!";
    const textSize = 50;
    ctx.font = `${50}px Arial`;
    ctx.fillStyle = "red";
    const textWidth = ctx.measureText(text).width;
    const textX = floorX + (floorWidth - textWidth) / 2;
    const textY = floorY + floorHeight / 2 + textSize / 2;
    ctx.fillText(text, textX, textY);
    // const gameOverOverlay = document.getElementById("gameOverOverlay");
    // gameOverOverlay.style.display = "flex";
    document.getElementById("scoreOverlay").innerText = `Final Score: ${score}`;

  } 

  function initializeGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isGameOver = false;
    playerFrameX = 3;
    playerFrameY = 3;
    playerX = floorX + floorWidth / 2 - playerWidth / 2;
    playerY = floorY + floorHeight / 2 - playerHeight / 2;
    playerDirection = "right";
    score = 0; //////////
    lastUpdateTime = Date.now(); ///////////////
    monsterManager.reset();
    if (monsterSpawnInterval) {
      clearInterval(monsterSpawnInterval);
    }
    monsterSpawnInterval = setInterval(() => {
      monsterManager.spawnRandomMonster(
        floorX,
        floorWidth,
        floorY,
        floorHeight
      );
    }, 500);

    if (!isGameRunning) {
      isGameRunning = true;
      requestAnimationFrame(animate);
    }
  }

  images.player.onload = function () {
    initializeGame();
  };

  window.addEventListener("resize", function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    floorX = (canvas.width - floorWidth) / 2;
    floorY = (canvas.height - floorHeight) / 2;
  });
});
















