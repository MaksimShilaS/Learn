class Game {
    constructor(context, width, height) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.enemies = [];
        this.enemySpawnInterval = 500;
        this.enemyTimer = 0;
        this.enemyTypes = ["worm", "ghost", "spider"];
    }

    update(deltaTime) {
        if (this.enemyTimer > this.enemySpawnInterval) {
            this.enemies = this.enemies.filter(obj => !obj.markedForDeletion);
            this.#addNewEnemy();
            this.enemyTimer = 0;
            console.log(this.enemies);
        } else {
            this.enemyTimer += deltaTime;
        }
        this.enemies.forEach(enemy => enemy.update(deltaTime));
    }

    draw() {
        this.enemies.forEach(enemy => enemy.draw(this.context));
    }

    #addNewEnemy() {
        const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)]
        switch (randomEnemy) {
            case "worm":
                this.enemies.push(new Worm(this));
                break;
            case "ghost":
                this.enemies.push(new Ghost(this));
                break;
            case "spider":
                this.enemies.push(new Spider(this));
                break;
        }
        this.enemies.sort((obj1, obj2) => obj1.y - obj2.y);
    }
}

class Enemy {
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
        this.frameX = 0;
        this.framesCount = 6;
        this.frameInterval = 100;
        this.frameTimer = 0;
    }

    update(deltaTime) {
        this.x -= this.vx * deltaTime;
        if (this.x < 0 - this.width) {
            this.markedForDeletion = true;
        }
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            this.frameX = ++this.frameX % this.framesCount;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

class Worm extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 229;
        this.spriteHeight = 171;
        this.width = this.spriteWidth * 0.5;
        this.height = this.spriteHeight * 0.5;
        this.x = this.game.width;
        this.y = this.game.height - this.height;
        this.vx = Math.random() * 0.1 + 0.1;
        this.image = worm;
    }
}

class Ghost extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 261;
        this.spriteHeight = 209;
        this.width = this.spriteWidth * 0.5;
        this.height = this.spriteHeight * 0.5;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.6;
        this.vx = Math.random() * 0.2 + 0.1;
        this.image = ghost;
        this.angle = 0;
        this.curve = Math.random() * 3;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.y += Math.sin(this.angle) * this.curve;
        this.angle += 0.04;
    }

    draw(context) {
        context.save();
        context.globalAlpha = 0.5;
        super.draw(context);
        context.restore();
    }
}

class Spider extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 310;
        this.spriteHeight = 175;
        this.width = this.spriteWidth * 0.5;
        this.height = this.spriteHeight * 0.5;
        this.x = Math.random() * this.game.width;
        this.y = 0 - this.height;
        this.vx = 0;
        this.vy = Math.random() * 0.1 + 0.1;
        this.maxLength = Math.random() * this.game.height;
        this.image = spider;
    }

    update(deltaTime) {
        super.update(deltaTime);        
        if (this.y < 0 - this.height * 2) {
            this.markedForDeletion = true;
        }
        this.y += this.vy * deltaTime;
        if (this.y > this.maxLength) {
            this.vy *= -1;
        }
    }

    draw(context) {
        context.beginPath();
        context.moveTo(this.x + this.width * 0.5, 0);
        context.lineTo(this.x + this.width * 0.5, this.y + 10);
        context.stroke();
        super.draw(context);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas1");
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const game = new Game(context, canvas.width, canvas.height);

    let lastTime = 0;
    function animate(timeStamp) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw();

        requestAnimationFrame(animate);
    }

    animate(0);
});