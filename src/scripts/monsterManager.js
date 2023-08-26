import Monster from './monster.js';

class MonsterManager {
    constructor() {
        this.monsters = [];
    }

    spawnMonster(x, y, spriteSrc) {
        const monster = new Monster(x, y, spriteSrc);
        this.monsters.push(monster);
    }
}