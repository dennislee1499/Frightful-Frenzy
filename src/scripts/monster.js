export default class Monster {
    constructor(x, y, spriteSrc) {
        this.x = x;
        this,y = y;
        this.width = 95;
        this.height = 95;
        this.sprite = new Image();
        this.sprite.src = spriteSrc;
    }

    draw(ctx) {
        ctx.drawImage(this.sprite, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update() {
        const direction = Math.floor(Math.random() * 4);

        switch (direction) {
            case 0:
                this.y -= 2;
                break;
            case 1:
                this.x += 2;
                break;
            case 2: 
                this.y += 2
                break;
            case 3:
                this.x -= 2;
                break;
        }
    }
}