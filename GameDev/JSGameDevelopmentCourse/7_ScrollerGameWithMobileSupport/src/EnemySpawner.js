import Enemy from "./Enemy.js";
import WormExplosion from "./WormExplosion.js";

export default class EnemySpawner {
    constructor(gameWidth, gameHeight, state) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.state = state;
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemySpawnInterval = this.#newSpawnInterval();
        this.explosions = [];
    }

    update(deltaTime) {
        if (this.enemyTimer > this.enemySpawnInterval) {
            this.enemies.push(new Enemy(this.gameWidth, this.gameHeight, this.state));
            this.enemySpawnInterval = this.#newSpawnInterval();
            console.log(this.enemySpawnInterval);
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
        const base = Math.random() * 2000 + 500
        return base / (this.state.level() * 0.6);
    }
}