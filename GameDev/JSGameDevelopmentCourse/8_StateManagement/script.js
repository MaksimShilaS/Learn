import Player from "./src/player.js";
import InputHandler from "./src/input.js";
import { drawStatusText } from "./src/utils.js";

window.addEventListener("load", () => {
    loader.style.display = "none";
    const canvas = document.getElementById("canvas1");
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const player = new Player(canvas.width, canvas.height); 
    const input = new InputHandler();

    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        context.clearRect(0, 0, canvas.width, canvas.height);
        player.update(input.lastKey);
        player.draw(context, deltaTime);
        drawStatusText(context, input, player);

        requestAnimationFrame(animate);
    }
    animate(0);
});