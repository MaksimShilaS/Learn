class GameWindow {
    constructor() {
        /** @type {HTMLCanvasElement} */
        this.canvas = document.getElementById("canvas1");
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width = 500;
        this.height = this.canvas.height = 800;
        this.frame = 0;
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    update() {
        this.frame++;
    }
}

const gameWindow = new GameWindow();
export default gameWindow;