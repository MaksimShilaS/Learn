export default class GameMenu {
    constructor(gameWidth, gameHeight, startGame) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.startGame = startGame;
        this.shown = false;
        this.isGameOver = false;
        this.score = 0;
        this.showPressEnter = true;
        this.showPressEnterInterval = 400;
        this.showPressEnterTime = 0;
    }

    update(deltaTime) {
        if (!this.shown) {
            return;
        }
        if (this.showPressEnterTime > this.showPressEnterInterval) {
            this.showPressEnterTime = 0;
            this.showPressEnter = !this.showPressEnter;
        } else {
            this.showPressEnterTime += deltaTime;
        }
    }

    draw(context) {
        if (!this.shown) {
            return;
        }
        if (this.isGameOver) {
            context.textAlign = "center";
            context.font = "100px Helvetica";
            context.fillStyle = "black";
            context.fillText("GAME OVER", this.gameWidth * 0.5, 200);
            context.fillStyle = "lightgray";
            context.fillText("GAME OVER", this.gameWidth * 0.5 + 2, 202);

            context.font = "70px Helvetica"
            context.fillStyle = "black";
            context.fillText("Your score: " + this.score, this.gameWidth * 0.5, 300);
            context.fillStyle = "lightgray";
            context.fillText("Your score: " + this.score, this.gameWidth * 0.5 + 2, 302);
        }
        if (this.showPressEnter) {
            context.textAlign = "center";
            context.font = "40px Helvetica";
            context.fillStyle = "black";
            context.fillText("PRESS ENTER", this.gameWidth * 0.5, 600);
            context.fillStyle = "lightgray";
            context.fillText("PRESS ENTER", this.gameWidth * 0.5 + 2, 600);
        }

    }

    show(state) {
        this.shown = true;
        if (state) {
            this.isGameOver = state.isGameOver;
            this.score = state.score;
        } else {
            this.isGameOver = false;
            this.score = 0;
        }
        window.addEventListener("keydown", this.#enterListener);
    }

    hide() {
        this.shown = false;
        window.removeEventListener("keydown", this.#enterListener);
    }

    #enterListener = (e) => {
        if (e.key === "Enter") {
            this.startGame();
        }
    }
}