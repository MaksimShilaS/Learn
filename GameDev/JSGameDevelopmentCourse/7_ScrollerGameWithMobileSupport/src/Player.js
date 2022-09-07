import { IMMORTAL, SHOW_HITBOX } from "./Global.js";

export default class Player {
    constructor(gameWidth, gameHeight, state) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.state = state;
        this.width = 200;
        this.height = 200;
        this.x = 0;
        this.y = this.gameHeight - this.height;
        this.image = playerImg;
        this.frameY = 0;
        this.frameX = 0;
        this.framesCount = 9;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.speed = 0;
        this.temp = 0;
        this.vy = 0;
        this.weight = 1;
        this.jumpHeight = 25;
        this.hitboxRadius = this.width * 0.35;
        this.hitSound = ouchAudio;
        this.hitSound.volume = 1;
    }

    draw(context) {
        if (SHOW_HITBOX) {
            context.strokeStyle = "white";
            context.beginPath();
            context.arc(this.#hitboxX(), this.#hitboxY(), this.hitboxRadius, 0, Math.PI * 2);
            context.stroke();
        }
        context.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    update(input, deltaTime, enemies) {
        // collision detection
        enemies.forEach(enemy => {
            const dx = enemy.hitboxX() - this.#hitboxX();
            const dy = enemy.hitboxY() - this.#hitboxY();
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < enemy.hitboxRadius + this.hitboxRadius) {
                !IMMORTAL && this.state.lives--;
                this.hitSound.play();
                enemy.hit = true;
            }
        })

        // sprite animation
        if (this.frameTimer > this.frameInterval) {
            this.frameX = ++this.frameX % this.framesCount;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        // controls
        if (input.isRight()) {
            this.speed = 5;
        } else if (input.isLeft()) {
            this.speed = -5;
        } else {
            this.speed = 0;
        }
        if (input.isUp() && this.#onGround()) {
            this.vy -= this.jumpHeight;
        }

        // horisontal movement
        this.x += this.speed;
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > this.gameWidth - this.width) {
            this.x = this.gameWidth - this.width;
        }

        // vertical movement
        this.y += this.vy;
        if (!this.#onGround()) {
            this.vy += this.weight;
            this.framesCount = 7;
            if (this.frameY != 1) {
                this.frameY = 1;
                this.frameX = 0;
            }
        } else {
            this.vy = 0;
            if (this.frameY != 0) {
                this.frameY = 0;
                this.frameX = 0;
                this.framesCount = 9;
            }

        }
        if (this.y > this.gameHeight - this.height) {
            this.y = this.gameHeight - this.height;
        }
    }

    #onGround() {
        return this.y >= this.gameHeight - this.height;
    }

    #hitboxX = () => this.x + this.width * 0.5;
    #hitboxY = () => this.y + this.height * 0.5 + 20;
}