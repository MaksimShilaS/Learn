const UP = ["ArrowUp", "w", " "];
const DOWN = ["ArrowDown", "s"];
const LEFT = ["ArrowLeft", "a"];
const RIGHT = ["ArrowRight", "d"];
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
            if (!this.keys.includes(e.key) && ALLOWED_KEYS.includes(e.key)) {
                this.keys.push(e.key);
            }
        });
        window.addEventListener("keyup", e => {
            if (ALLOWED_KEYS.includes(e.key)) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        })
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