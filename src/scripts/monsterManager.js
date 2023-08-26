import Monster from "./monster.js";

export default class MonsterManager {
    constructor() {
        this.monsters = [];
        this.maxMonsters = 10;
    }

    spawnMonster(x, y, spriteSrc) {
        const monster = new Monster(x, y, spriteSrc);
        this.monsters.push(monster);
    }

    spawnRandomMonster(floorX, floorWidth, floorY, floorHeight) {

        if (this.monsters.length >= this.maxMonsters) {
            return;
        }
        const side = Math.floor(Math.random() * 4);
        let x, y;

        switch(side) {
            case 0:
                x = floorX + Math.random() * floorWidth;
                y = floorY - 80;
                break;
            case 1:
                x = floorX + floorWidth ;
                y = floorY + Math.random() * floorHeight;
                break;
            case 2:
                x = floorX + Math.random() * floorWidth;
                y = floorY + floorHeight;
                break;
            case 3:
                x = floorX - 65;
                y = floorY + Math.random() * floorHeight;
                break;
        }

        this.spawnMonster(x, y, "images/rotting_zombie2.png");
    }

    updateAll(floorX, floorWidth, floorY, floorHeight) {
        for (let i = this.monsters.length - 1; i >= 0; i--) {
            const isWithinBounds = this.monsters[i].update(floorX, floorWidth, floorY, floorHeight);
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