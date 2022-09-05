const KEYS = [];
KEYS[0] = "GamepadA";
KEYS[1] = "GamepadB";
KEYS[2] = "GamepadX";
KEYS[3] = "GamepadY";
KEYS[4] = "";
KEYS[5] = "";
KEYS[6] = "";
KEYS[7] = "";
KEYS[8] = "GamepadSelect";
KEYS[9] = "GamepadStart";
KEYS[10] = "";
KEYS[11] = "";
KEYS[12] = "GamepadUp";
KEYS[13] = "GamepadDown";
KEYS[14] = "GamepadLeft";
KEYS[15] = "GamepadRight";
KEYS[16] = "";

export default class GamepadApi {
    constructor(onKeyDown, onKeyUp) {
        this.onKeyDown = onKeyDown;
        this.onKeyUp = onKeyUp;
    }

    update() {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
        if (!gamepads) {
            return;
        }
        var gp = gamepads[0];
        if (!gp) {
            return;
        }
        for (let i = 0; i < gp.buttons.length; ++i) {
            const btn = gp.buttons[i];
            if (btn.pressed) {
                this.onKeyDown({ code: KEYS[i]});
            } else {
                this.onKeyUp({ code: KEYS[i]});
            }
        }
    }
}