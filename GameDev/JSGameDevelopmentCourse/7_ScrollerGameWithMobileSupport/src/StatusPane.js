export default class StatusPane {
    constructor(gameWidth, gameHeight, state) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.state = state;
        this.spriteWidth = 1200;
        this.spriteHeight = 1200;
        this.sizeMultiplier = 0.05;
        this.width = this.spriteWidth * this.sizeMultiplier;
        this.height = this.spriteHeight * this.sizeMultiplier;
        this.paneX = this.gameWidth - 320;
        this.paneY = 10;
        this.heartsOffset = 0;
        this.image = heartImg;
    }

    update() {
    }

    draw(context) {
        this.#displayScore(context);
        this.#displayLives(context);
    }


    #displayScore(context) {
        context.fillStyle = "black";
        context.fillText("Score: " + this.state.score, 100, 50);
        context.fillStyle = "lightgray";
        context.fillText("Score: " + this.state.score, 102, 52);
        context.fillStyle = "black";
    }

    #displayLives(context) {
        for (let i = 0; i < this.state.lives; i++) {
            context.drawImage(
                this.image,
                0,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.paneX + (this.width + this.heartsOffset) * i,
                this.paneY,
                this.width,
                this.height);
        }
    }
}