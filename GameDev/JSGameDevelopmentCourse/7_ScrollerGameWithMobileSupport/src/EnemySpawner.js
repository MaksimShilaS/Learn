import Enemy from "./Enemy.js";
import WormExplosion from "./WormExplosion.js";

export default class EnemySpawner {
    constructor(gameWidth, gameHeight, state) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.state = state;
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemySpawnInterval = this.#newSpawnInterval() / (1 + this.state.level() * 0.2);
        this.explosions = [];
    }

    update(deltaTime) {
        if (this.enemyTimer > this.enemySpawnInterval) {
            this.enemies.push(new Enemy(this.gameWidth, this.gameHeight, this.state));
            this.enemySpawnInterval = this.#newSpawnInterval();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }
        [...this.enemies, ...this.explosions].forEach(obj => {
            obj.update(deltaTime);
        });
        this.enemies = this.enemies.filter(enemy => {
            if (enemy.markedForDeletion) {
                return false;
            }
            if (enemy.hit) {
                this.explosions.push(new WormExplosion(enemy.x, this.gameHeight, enemy.width));
                return false;
            }
            return true;
        });
        this.explosions = this.explosions.filter(exp => !exp.markedForDeletion);

    }

    draw(context) {
        [...this.enemies, ...this.explosions].forEach(obj => obj.draw(context));
    }

    #newSpawnInterval() {
        return Math.random() * 3000 + 1000;
    }
}