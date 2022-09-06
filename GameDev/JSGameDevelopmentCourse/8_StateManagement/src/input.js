export default class InputHandler {
    constructor() {
        window.addEventListener("keydown", e => {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    this.lastKey = "PRESS left";
                    break;
                case "ArrowRight":
                case "KeyD":
                    this.lastKey = "PRESS right";
                    break;
                case "ArrowDown":
                case "KeyS":
                    this.lastKey = "PRESS down";
                    break;
                case "ArrowUp":
                case "KeyW":
                case "Space":
                    this.lastKey = "PRESS up";
                    break;
            }
        });
        window.addEventListener("keyup", e => {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    this.lastKey = "RELEASE left";
                    break;
                case "ArrowRight":
                case "KeyD":
                    this.lastKey = "RELEASE right";
                    break;
                case "ArrowDown":
                case "KeyS":
                    this.lastKey = "RELEASE down";
                    break;
                case "ArrowUp":
                case "KeyW":
                case "Space":
                    this.lastKey = "RELEASE up";
                    break;
            }
        })
    }
}