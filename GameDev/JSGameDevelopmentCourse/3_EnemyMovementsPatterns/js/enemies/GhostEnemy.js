import gameWindow from "../GameWindow.js";

export default class GhostEnemy {
    constructor() {
        this.image = new Image();
        this.image.src = "assets/enemy3.png";
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 218;
        this.spriteHeigth = 177;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeigth / 2.5;

        this.x = Math.random() * (gameWindow.width - this.width);
        this.y = Math.random() * (gameWindow.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = 0;
        this.angleSpeed = Math.random() * 1 + 0.5;
        this.curve = Math.random() * 200 + 50;
    }

    update() {
        const xCenter = gameWindow.width / 2 - this.width / 2;
        this.x = this.curve * Math.sin(this.angle * Math.PI / 90) + xCenter;
        const yCenter = gameWindow.height / 2 - this.height / 2;
        this.y = this.curve * Math.cos(this.angle * Math.PI / 270) + yCenter;
        this.angle += this.angleSpeed;
        if (gameWindow.frame % this.flapSpeed === 0) {
            this.frame = ++this.frame % 5;
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