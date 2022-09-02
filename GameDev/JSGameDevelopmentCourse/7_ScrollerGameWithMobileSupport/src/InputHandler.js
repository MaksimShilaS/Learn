const UP = ["ArrowUp", "KeyW", "Space"];
const DOWN = ["ArrowDown", "KeyS"];
const LEFT = ["ArrowLeft", "KeyA"];
const RIGHT = ["ArrowRight", "KeyD"];
const ALLOWED_KEYS = [
    ...UP,
    ...DOWN,
    ...LEFT,
    ...RIGHT
];
export default class InputHandler {
    constructor() {
        this.keys = [];
        window.addEventListener("keydown", e => {
            console.log(e);
            if (!this.keys.includes(e.code) && ALLOWED_KEYS.includes(e.code)) {
                this.keys.push(e.code);
            }
        });
        window.addEventListener("keyup", e => {
            if (ALLOWED_KEYS.includes(e.code)) {
                this.keys.splice(this.keys.indexOf(e.code), 1);
            }
        });
    }

    isUp = () => this.#keyPressed(UP);
    isDown = () => this.#keyPressed(DOWN);
    isLeft = () => this.#keyPressed(LEFT);
    isRight = () => this.#keyPressed(RIGHT);

    #keyPressed(keys) {
        for (let i = 0; i < keys.length; ++i) {
            if (this.keys.includes(keys[i])) {
                return true;
            }
        }
        return false;
    }
}