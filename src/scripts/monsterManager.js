

import Monster from "./zombie.js";

const monsterTypes = [
  {
    spriteSrc: "images/rotting_zombie2.png",
    width: 65,
    height: 80,
    framesX: 3,
    framesY: 4,
    type: "zombie",
    speed: 4
  },
  {
    spriteSrc: "images/imp.png",
    width: 80,
    height: 80,
    framesX: 4,
    framesY: 4,
    type: "imp",
    speed: 6
  },
  {
    spriteSrc: "images/sheepman.png",
    width: 150,
    height: 205,
    framesX: 3,
    framesY: 4,
    type: "sheepman",
    speed: 2,
    spawnRate: 0.4
  }
];

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

  spawnMonster(x, y, spriteSrc, width, height) {
    const monster = new Monster(x, y, spriteSrc, width, height);
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

    const randomMonsterType = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];

    if (Math.random() > randomMonsterType.spawnRate) {
      return;
    }

     const side = this.getNextSide();
     let x, y;
     const monsterWidth = randomMonsterType.width;
     const monsterHeight = randomMonsterType.height;

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

    const monster = new Monster(
      x,
      y,
      randomMonsterType.spriteSrc,
      randomMonsterType.width,
      randomMonsterType.height,
      randomMonsterType.framesX,
      randomMonsterType.framesY,
      randomMonsterType.type,
      randomMonsterType.speed
    );

        // const monsterManager = new MonsterManager();
        // monsterManager.spawnRandomMonster(floorX, floorWidth, floorY, floorHeight, monsterManager.monsterTypes);


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