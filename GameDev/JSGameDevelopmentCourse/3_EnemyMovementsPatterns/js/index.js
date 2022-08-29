import gameWindow from "./GameWindow.js";
import enemiesFactory from "./EnemiesFactory.js";

let enemy = "saw";
let enemiesCount = 30;
let enemies = enemiesFactory[enemy].get(enemiesCount);

const enemySelect = document.getElementById("enemies");
enemySelect.value = enemy;
enemySelect.addEventListener("change", (e) => {
    enemy = e.target.value;
    fillEnemies();
});

const enemiesCountSelect = document.getElementById("enemiesCount");
enemiesCountSelect.value = enemiesCount;
enemiesCountSelect.addEventListener("change", (e) => {
    enemiesCount = e.target.value;
    fillEnemies();
});

function fillEnemies() {
    enemies = [];
    if (enemiesFactory.hasOwnProperty(enemy)) {
        enemies = enemiesFactory[enemy].get(enemiesCount);
    }
}

function animate() {
    gameWindow.clear();
    enemies.forEach(enemy => {
        enemy.update();
        enemy.draw(gameWindow.context);
    });
    gameWindow.update();
    requestAnimationFrame(animate);
}

animate();