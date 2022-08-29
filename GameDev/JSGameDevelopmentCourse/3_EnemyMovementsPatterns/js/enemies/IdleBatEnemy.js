import gameWindow from "../GameWindow.js";

export default class IdleBatEnemy {
    constructor() {
        this.image = new Image();
        this.image.src = "assets/enemy1.png";
        this.spriteWidth = 293;
        this.spriteHeigth = 155;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeigth / 2.5;

        this.x = Math.random() * (gameWindow.width - this.width);
        this.y = Math.random() * (gameWindow.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    }

    update() {
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5;
        if (gameWindow.frame % this.flapSpeed === 0) {
            this.frame = (this.frame + 1) % 6;
        }
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeigth,
            this.x,
            this.y,
            this.width,
            this.height);
    }
}