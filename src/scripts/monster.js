export default class Monster {
  constructor(x, y, spriteSrc) {
    this.x = x;
    this.y = y;
    this.width = 65; // One sprite's width
    this.height = 80; // One sprite's height
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
  }

  setFrameYBasedOnDirection() {
    // Use an object map for directions
    const directions = {
      up: 3,
      down: 0,
      left: 1,
      right: 2,
    };
    this.frameY = directions[this.direction];
  }

  draw(ctx) {
    if (this.isLoaded) {
      ctx.drawImage(
        this.sprite,
        this.width * this.frameX,
        this.height * this.frameY,
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
      this.frameX = (this.frameX + 1) % 3;
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
