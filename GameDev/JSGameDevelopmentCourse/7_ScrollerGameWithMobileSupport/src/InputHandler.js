import GamepadApi from "./GamepadApi.js";

const UP = ["ArrowUp", "KeyW", "Space", "GamepadA", "GamepadUp"];
const DOWN = ["ArrowDown", "KeyS", "GamepadDown"];
const LEFT = ["ArrowLeft", "KeyA", "GamepadLeft"];
const RIGHT = ["ArrowRight", "KeyD", "GamepadRight"];
const ALLOWED_KEYS = [
    ...UP,
    ...DOWN,
    ...LEFT,
    ...RIGHT
];

export default class InputHandler {
    constructor() {
        this.keys = [];
        this.gamepadApi = new GamepadApi(this.#keydown, this.#keyup);
        window.addEventListener("gamepadconnected", this.#gamepadconnected);
        window.addEventListener("gamepaddisconnected", this.#gamepaddisconnected);
        window.addEventListener("keydown", this.#keydown);
        window.addEventListener("keyup", this.#keyup);
        window.addEventListener("keypress", e => console.log(e));
        this.iii = 0;
    }

    isUp = () => this.#keyPressed(UP);
    isDown = () => this.#keyPressed(DOWN);
    isLeft = () => this.#keyPressed(LEFT);
    isRight = () => this.#keyPressed(RIGHT);

    update() {
        this.gamepadApi.update();
    }

    #gamepadconnected = e => {
        this.gamepad = e.gamepad;
        this.gamepadButtons = this.gamepad.buttons;
    }
    #gamepaddisconnected = e => {
        this.gamepad = null;
        this.gamepadButtons = null;
    }
    #keydown = e => {
        if (!this.keys.includes(e.code) && ALLOWED_KEYS.includes(e.code)) {
            this.keys.push(e.code);
        }
    }
    #keyup = e => {
        if (this.keys.includes(e.code)) {
            this.keys.splice(this.keys.indexOf(e.code), 1);
        }
    }
    #keyPressed(keys) {
        for (let i = 0; i < keys.length; ++i) {
            if (this.keys.includes(keys[i])) {
                return true;
            }
        }
        return false;
    }
}