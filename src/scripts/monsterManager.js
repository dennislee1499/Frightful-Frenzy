import Monster from "./monster.js";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default class MonsterManager {
  constructor() {
    this.monsters = [];
    this.maxMonsters = 10;
    this.sides = shuffleArray([0, 1, 2, 3]);
  }

  spawnMonster(x, y, spriteSrc) {
    const monster = new Monster(x, y, spriteSrc);
    this.monsters.push(monster);
  }

  getNextSide() {
    if (this.sides.length === 0) {
      this.sides = shuffleArray([0, 1, 2, 3]);
    }
    return this.sides.pop();
  }

  spawnRandomMonster(floorX, floorWidth, floorY, floorHeight) {
    if (this.monsters.length >= this.maxMonsters) {
      return;
    }

    const side = this.getNextSide();
    let x, y;

    const monsterWidth = 65;
    const monsterHeight = 80;

    switch (side) {
      case 0: // Top side
        x = floorX + Math.random() * (floorWidth - monsterWidth);
        y = floorY; 
        break;
      case 1: // Right side
        x = floorX + floorWidth - monsterWidth;
        y = floorY + Math.random() * (floorHeight - monsterHeight);
        break;
      case 2: // Bottom side
        x = floorX + Math.random() * (floorWidth - monsterWidth);
        y = floorY + floorHeight - monsterHeight; 
        break;
      case 3: // Left side
        x = floorX; 
        y = floorY + Math.random() * (floorHeight - monsterHeight);
        break;
    }

    const monster = new Monster(x, y, "images/rotting_zombie2.png");

    switch (side) {
      case 0:
        monster.direction = "down"; // should run downwards
        break;
      case 1:
        monster.direction = "left"; // should run leftwards
        break;
      case 2:
        monster.direction = "up"; // should run upwards
        break;
      case 3:
        monster.direction = "right"; // should run rightwards
        break;
    }

    this.monsters.push(monster);
  }


  updateAll(floorX, floorWidth, floorY, floorHeight) {
    for (let i = this.monsters.length - 1; i >= 0; i--) {
      const isWithinBounds = this.monsters[i].update(
        floorX,
        floorWidth,
        floorY,
        floorHeight
      );
      if (!isWithinBounds) {
        this.monsters.splice(i, 1);
      }
    }
  }

  drawAll(ctx) {
    for (const monster of this.monsters) {
      monster.draw(ctx);
    }
  }
}