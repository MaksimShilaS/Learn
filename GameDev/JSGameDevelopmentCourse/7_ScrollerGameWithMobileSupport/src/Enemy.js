import { SHOW_HITBOX } from "./Global.js";

export default class Enemy {
    constructor(gameWidth, gameHeight, state) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.state = state;
        this.spriteWidth = 160;
        this.spriteHeight = 119;
        this.sizeModifier = Math.random() * 1.5 + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.image = enemyImg;
        this.x = this.gameWidth;
        this.y = this.gameHeight - this.height;
        this.frameX = 0;
        this.framesCount = 6;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.speed = 6 * (1 + this.state.level() * (Math.random() * 0.1 + 0.4));
        this.markedForDeletion = false;
        this.hit = false;
        this.hitboxRadius = this.width * 0.4;
    }

    draw(context) {
        if (SHOW_HITBOX) {
            context.strokeStyle = "white";
            context.beginPath();
            context.arc(this.hitboxX(), this.hitboxY(), this.hitboxRadius, 0, Math.PI * 2);
            context.stroke();
        }

        context.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height);
    }

    update(deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            this.frameX = ++this.frameX % this.framesCount;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        this.x -= this.speed;
        if (this.x < 0 - this.width) {
            this.markedForDeletion = true;
            this.state.score++;
        }
    }

    hitboxX = () => this.x + this.width * 0.5 - 30 * this.sizeModifier;
    hitboxY = () => this.y + this.height * 0.5;
}