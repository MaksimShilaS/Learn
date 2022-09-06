import { newStates, STATES } from "./state.js";

export default class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.image = dogImg;
        this.width = 200;
        this.height = 181.83;
        this.x = this.gameWidth * 0.5 - this.width * 0.5;
        this.y = this.gameHeight - this.height;
        this.vx = 0;
        this.maxVX = 10;
        this.slideDamping = 0.2;
        this.vy = 0;
        this.maxVY = 25;
        this.jumpDamping = 1;

        this.states = newStates(this);
        this.frameX = 0;
        this.frameY = 0;
        this.framesCount = 0;
        this.currentState = this.states[STATES.STANDING_RIGHT];
        this.currentState.init();

        this.fps = 30;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
    }

    draw(context, deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            this.frameX = (this.frameX + 1) % this.framesCount;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
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
        );
    }

    update(input) {
        this.currentState.update(input);

        // horizontal movement
        this.x += this.vx;
        if (this.x >= this.gameWidth - this.width) {
            this.x = this.gameWidth - this.width;
        } else if (this.x <= 0) {
            this.x = 0;
        }

        // vertical movement
        this.y += this.vy;
        if (!this.onGround()) {
            this.vy += this.jumpDamping;
        } else {
            this.vy = 0;
            this.y = this.gameHeight - this.height;
        }
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.init();
        return this;
    }

    onGround() {
        return this.y >= this.gameHeight - this.height;
    }
}