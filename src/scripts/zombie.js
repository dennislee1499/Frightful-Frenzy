export default class Monster {
  constructor(x, y, spriteSrc, width = 65, height = 80, framesX = 3, framesY = 4, type = "default", speed = 5) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = new Image();
    this.isLoaded = false;
    this.sprite.onload = () => {
      this.isLoaded = true;
    };
    this.sprite.src = spriteSrc;
    this.frameX = 0;
    this.speed = 5;
    this.direction = ["up", "down", "left", "right"][
      Math.floor(Math.random() * 4)
    ];
    this.setFrameYBasedOnDirection();
    this.animationCounter = 0;
    this.animationDelay = 3;
    this.framesX = framesX;
    this.framesY = framesY;
    this.type = type;
    this.speed = speed;
  }

  setFrameYBasedOnDirection() {
    // Use an object map for directions
    let directions = {
      up: 3,
      down: 0,
      left: 1,
      right: 2,
    };

    if (this.type === "imp") {
      directions = {
        up: 1,
        down: 0,
        left: 3,
        right: 2,
      };
    }
    if (this.type === "sheepman") {
      directions = {
        up: 0,
        down: 2,
        left: 3,
        right: 1,
      };
    }
    this.frameY = directions[this.direction];
  }

  draw(ctx) {
    if (this.isLoaded) {
      ctx.drawImage(
        this.sprite,
        this.width * (this.frameX % this.framesX),
        this.height * (this.frameY % this.framesY),
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
      this.updateAnimationFrame();
    }
  }

  updateAnimationFrame() {
    this.animationCounter++;
    if (this.animationCounter > this.animationDelay) {
      this.frameX = (this.frameX + 1) % this.framesX;
      this.animationCounter = 0;
    }
  }

  update(floorX, floorWidth, floorY, floorHeight) {
    this.setFrameYBasedOnDirection();

    switch (this.direction) {
      case "up":
        this.y -= this.speed;
        break;
      case "down":
        this.y += this.speed;
        break;
      case "left":
        this.x -= this.speed;
        break;
      case "right":
        this.x += this.speed;
        break;
    }

    if (
      this.x < floorX ||
      this.x + this.width > floorX + floorWidth ||
      this.y < floorY ||
      this.y + this.height > floorY + floorHeight
    ) {
      return false;
    }
    return true;

  }
}
