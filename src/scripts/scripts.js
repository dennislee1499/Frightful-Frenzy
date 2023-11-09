import MonsterManager from "./monsterManager.js";
import { checkCollision } from "./collision.js";


document.addEventListener("DOMContentLoaded", function () {
  let floor = document.querySelector(".floor"); 
  floor.style.display = "none";

  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let monsterSpawnInterval;
  let keys = {};
  let score = 0; 
  let lastUpdateTime = Date.now(); 
  const scoreIncreaseInterval = 100; 
  let isGameOver = false;
  let isGameRunning = false;
  const monsterManager = new MonsterManager();
  

  const floorWidth = 1300;
  const floorHeight = 665.55;
  let floorX;
  let floorY;

  const playerWidth = 95;
  const playerHeight = 95;
  const buffer = 30; 
  let playerX;
  let playerY;
  let playerFrameX = 3;
  let playerFrameY = 3;
  const playerSpeed = 7;
  let playerDirection = "right";

  document
    .getElementById("startGameButton")
    .addEventListener("click", function () {
      document.getElementById("gameTitle").style.display = "block";
      document.getElementById("scoreOverlay").style.display = "block";
      document.getElementById("githubLink").style.display = "block";
      document.getElementById("instructionsOverlay").style.display = "none";
      floor.style.display = "block";

      let bgMusic = document.getElementById("bgMusic");
      let collisionSound = document.getElementById("collisionSound");
      let introVolumeSlider = document.getElementById("volumeSlider");

      bgMusic.volume = introVolumeSlider.value;
      collisionSound.volume = introVolumeSlider.value;
      collisionSound.muted = bgMusic.muted;



      let inGameVolumeSlider = document.getElementById("inGameVolumeSlider");
      if (inGameVolumeSlider) {
        inGameVolumeSlider.value = introVolumeSlider.value;
      }

      let inGameMuteButton = document.getElementById("inGameMuteButton");
      if (inGameMuteButton) {
        inGameMuteButton.innerText = bgMusic.muted ? "Unmute" : "Mute";
      }

  
      initializeGame();

      let audioControls = document.getElementById("audioControls");
      audioControls.style.position = "absolute";
      audioControls.style.top = "auto";
      audioControls.style.left = "10px";
      audioControls.style.bottom = "10px";
      audioControls.style.display = "block";
    }); 


    document
      .getElementById("volumeSlider")
      .addEventListener("input", function () {
        let bgMusic = document.getElementById("bgMusic");
        let collisionSound = document.getElementById("collisionSound");
        bgMusic.volume = this.value;
        collisionSound.volume = this.value;
      });

      document
        .getElementById("muteButton")
        .addEventListener("click", function () {
          let bgMusic = document.getElementById("bgMusic");
          let collisionSound = document.getElementById("collisionSound");

          bgMusic.muted = !bgMusic.muted;
          collisionSound.muted = bgMusic.muted;
          this.innerText = bgMusic.muted ? "Unmute" : "Mute";
        });

        bgMusic.play();


        document
          .getElementById("inGameVolumeSlider")
          .addEventListener("input", function () {
            let bgMusic = document.getElementById("bgMusic");
            let collisionSound = document.getElementById("collisionSound");
            bgMusic.volume = this.value;
            collisionSound.volume = this.value;
          });

        document
          .getElementById("inGameMuteButton")
          .addEventListener("click", function () {
            let bgMusic = document.getElementById("bgMusic");
            let collisionSound = document.getElementById("collisionSound");

             bgMusic.muted = !bgMusic.muted;
             collisionSound.muted = bgMusic.muted;

             this.innerText = bgMusic.muted ? "Unmute" : "Mute";
             this.innerText = collisionSound.muted ? "Unmute" : "Mute";
          });



  document.addEventListener("keydown", function (event) {
    event.preventDefault();
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


  
  function drawStaticComponents() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images.canvasBackground, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(images.background, floorX, floorY, floorWidth, floorHeight);
    playerX = floorX + floorWidth / 2 - playerWidth / 2;
    playerY = floorY + floorHeight / 2 - playerHeight / 2;
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
  }



  function updateScoreDisplay() {
    document.getElementById("scoreOverlay").innerText = `Score: ${score}`;
  }

  const animationFPS = 10;
  const animationInterval = 1000 / animationFPS;
  let lastFrameTime = Date.now();


  function animate() {
    const now = Date.now();
    const elapsed = now - lastFrameTime;

    if (elapsed > animationInterval) {
      lastFrameTime = now - (elapsed % animationInterval);

      playerFrameX = (playerFrameX + 1) % 4;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images.canvasBackground, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(images.background, floorX, floorY, floorWidth, floorHeight);


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

    if (isGameOver) {
      gameOver();
    } else {
      requestAnimationFrame(animate);
    }
  }



  function update() {
    if (isGameOver) return;
    let currentTime = Date.now(); 
    if (currentTime - lastUpdateTime >= scoreIncreaseInterval) {
      score++;
      lastUpdateTime = currentTime;
      updateScoreDisplay(); 
      monsterManager.updateScore(score); 
    } 

    
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
        let collisionSound = document.getElementById("collisionSound");

         if (!collisionSound.muted) {
           collisionSound.currentTime = 0; 
           collisionSound.play(); 
         }
        gameOver();
        return;
      }
    }
  }

  function boundaryChecks() {
    if (playerX + playerWidth > floorX + floorWidth) {
      playerX = floorX + floorWidth - playerWidth;
    }
    
    if (playerX < floorX) {
      playerX = floorX;
    }
    
    if (playerY + playerHeight > floorY + floorHeight) {
      playerY = floorY + floorHeight - playerHeight;
    }
   
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


    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.drawImage(images.canvasBackground, 0, 0, canvas.width, canvas.height); 
    ctx.drawImage(images.background, floorX, floorY, floorWidth, floorHeight);  
    
    if (monsterSpawnInterval) {
      clearInterval(monsterSpawnInterval);
    }
    isGameOver = true;
    isGameRunning = false;
    const textGameOver = "Game Over!";
    const textGameOverSize = 50;
    ctx.font = `${50}px Arial`;
    ctx.fillStyle = "white";
    const textGameOverWidth = ctx.measureText(textGameOver).width;
    const textGameOverX = floorX + (floorWidth - textGameOverWidth) / 2;
    const textGameOverY = floorY + floorHeight / 2 + textGameOverSize / 2;
    ctx.fillText(textGameOver, textGameOverX, textGameOverY);


    const textScore = `Final Score: ${score}`;
    const textScoreSize = 30;
    ctx.font = `${textScoreSize}px Arial`;
    const textScoreWidth = ctx.measureText(textScore).width;
    const textScoreX = floorX + (floorWidth - textScoreWidth) / 2;
    const textScoreY = textGameOverY + textScoreSize + 30; 
    ctx.fillText(textScore, textScoreX, textScoreY);


    const textRestart = "Press 'R' to restart";
    const textRestartSize = 30;
    ctx.font = `${textRestartSize}px Arial`;
    const textRestartWidth = ctx.measureText(textRestart).width;
    const textRestartX = floorX + (floorWidth - textRestartWidth) / 2;
    const textRestartY = textScoreY + textRestartSize + 30; 
    ctx.fillText(textRestart, textRestartX, textRestartY);




    const gameOverOverlay = document.getElementById("gameOverOverlay"); 
    if (gameOverOverlay) {
      gameOverOverlay.style.display = "flex";
    }

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
    score = 0; 
    lastUpdateTime = Date.now(); 
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
    }, 750);

    if (!isGameRunning) {
      isGameRunning = true;
      requestAnimationFrame(animate);
    }
  }

  images.player.onload = function () {
    drawStaticComponents();
  };

  window.addEventListener("resize", function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    floorX = (canvas.width - floorWidth) / 2;
    floorY = (canvas.height - floorHeight) / 2;
    if (isGameOver) {
      gameOver();
    } else {
      drawStaticComponents();
    }
  });
});


















