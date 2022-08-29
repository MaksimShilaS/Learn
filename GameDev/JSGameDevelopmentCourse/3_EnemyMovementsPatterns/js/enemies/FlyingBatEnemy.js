import gameWindow from "../GameWindow.js";

export default class FlyingBatEnemy {
    constructor() {
        this.image = new Image();
        this.image.src = "assets/enemy2.png";
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 266;
        this.spriteHeigth = 188;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeigth / 2.5;

        this.x = Math.random() * (gameWindow.width - this.width);
        this.y = Math.random() * (gameWindow.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.2;
        this.curve = Math.random() * 7;
    }

    update() {
        this.x -= this.speed;
        this.y += this.curve * Math.sin(this.angle);
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) {
            this.x = gameWindow.width;
        }
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