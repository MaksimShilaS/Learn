import gameWindow from "../GameWindow.js";

export default class SawEnemy {
    constructor() {
        this.image = new Image();
        this.image.src = "assets/enemy4.png";
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 213;
        this.spriteHeigth = 213;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeigth / 2.5;
        this.x = Math.random() * (gameWindow.width - this.width);
        this.y = Math.random() * (gameWindow.height - this.height);
        this.newX = Math.random() * (gameWindow.width - this.width);
        this.newY = Math.random() * (gameWindow.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random() * 200 + 50);
    }

    update() {
        if (gameWindow.frame % this.interval === 0) {
            this.newX = Math.random() * (gameWindow.width - this.width);
            this.newY = Math.random() * (gameWindow.height - this.height);
        }
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx / 20;
        this.y -= dy / 20;
        if (gameWindow.frame % this.flapSpeed === 0) {
            this.frame = ++this.frame % 9;
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