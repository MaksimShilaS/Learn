import { LIVES } from "./Global.js";

export default class State {
    constructor() {
        this.score = 0;
        this.lives = LIVES;
        this.isGameOver = false;
    }

    level() {
        return Math.floor(this.score / 10) + 1;
    }
}