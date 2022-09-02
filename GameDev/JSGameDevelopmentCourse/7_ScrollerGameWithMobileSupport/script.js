import InputHandler from "./src/InputHandler.js";
import State from "./src/State.js";
import Player from "./src/Player.js";
import Background from "./src/Background.js";
import StatusPane from "./src/StatusPane.js";
import EnemySpawner from "./src/EnemySpawner.js";
import GameMenu from "./src/GameMenu.js";

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas1");
    canvas.width = window.innerWidth;
    canvas.height = 720;

    const context = canvas.getContext("2d");

    let isGameRunning = false;
    let state, player, livesPane, enemySpawner;
    const input = new InputHandler();
    const gameMenu = new GameMenu(canvas.width, canvas.height, newGame);
    const background = new Background(canvas.width, canvas.height);
    let lastTime = 0;

    const soundtrack = new Audio();
    soundtrack.src = "assets/soundtrack.mp3";
    soundtrack.volume = 0.3;
    soundtrack.addEventListener("ended", () => soundtrack.play());
    soundtrack.play();
    
    function newGame() {
        gameMenu.hide();
        isGameRunning = true;
        state = new State();
        player = new Player(canvas.width, canvas.height, state);
        enemySpawner = new EnemySpawner(canvas.width, canvas.height, state);
        livesPane = new StatusPane(canvas.width, canvas.height, state);
        lastTime = 0;
    }

    gameMenu.show();
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (isGameRunning) {
            if (state.lives > 0) {
                background.draw(context);
                background.update(deltaTime);
                player.draw(context);
                player.update(input, deltaTime, enemySpawner.enemies);
                livesPane.draw(context);
                enemySpawner.update(deltaTime);
                enemySpawner.draw(context);
            } else {
                state.isGameOver = true;
                isGameRunning = false;
                gameMenu.show(state);
            }
        } else {
            background.draw(context);
            gameMenu.update(deltaTime);
            gameMenu.draw(context);
        }

        requestAnimationFrame(animate);
    }

    animate(0);
});