const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = document.getElementById("collisionCanvas");
const collisionCanvasContext = collisionCanvas.getContext("2d");
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let score = 0;
let lives = 10;
const immortal = true;
context.font = "50px Impact";

let timeToNextRaven = 0;
let ravenIntervalMs = 500;
let lastTimestamp = 0;

let ravens = [];
let explosions = [];

class Raven {
    constructor() {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.6 + 0.4;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = "assets/raven.png";
        this.framesCount = 5;
        this.frame = 0;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
        this.randomColors = [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
        ];
        this.color = `rgb(${this.randomColors[0]},${this.randomColors[1]},${this.randomColors[2]})`;
        this.hasTrail = Math.random() > 0.5;
    }

    update(deltatime) {
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = -this.directionY;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width) {
            if (!immortal) lives--;
            this.markedForDeletion = true;
            return;
        }
        this.timeSinceFlap += deltatime;
        if (this.timeSinceFlap > this.flapInterval) {
            this.frame = (this.frame + 1) % this.framesCount;
            this.timeSinceFlap = 0;
            if (this.hasTrail) {
                for (let i = 0; i < 5; i++) {
                    particles.push(new Particle(this.x, this.y, this.width, this.color))
                }                
            }
        }
    }

    draw() {
        collisionCanvasContext.fillStyle = this.color;
        collisionCanvasContext.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

class Explosion {
    constructor(x, y, size) {
        this.image = new Image();
        this.image.src = "assets/boom.png";
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.sound = new Audio();
        this.sound.src = "assets/boom.wav";
        this.timeSinceLastFrame = 0;
        this.frameInterval = 100;
        this.frame = 0;
        this.framesCount = 5;
        this.markedForDeletion = false;
    }

    update(deltatime) {
        if (this.frame === 0) {
            this.sound.play();
        }
        if (this.frame > this.framesCount) {
            this.markedForDeletion = true;
        }
        this.timeSinceLastFrame += deltatime;
        if (this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            this.timeSinceLastFrame = 0;
        }        
    }

    draw() {
        context.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x - this.size * 0.5,
            this.y - this.size * 0.5,
            this.size,
            this.size * (this.spriteHeight / this.spriteWidth)
        )
    }
}
let particles = [];

class Particle {
    constructor(x, y, size, color) {
        this.size = size;
        this.x = x + this.size * 0.5 + Math.random() * 50 - 25;
        this.y = y + this.size * 0.33 + Math.random() * 50 - 25;
        this.radius = Math.random() * this.size * 0.1;
        this.maxRadius = Math.random() * 20 + 35;
        this.markedForDeletion = false;
        this.speedX = Math.random() * 1 + 0.5;
        this.color = color;
    }

    update() {
        this.x += this.speedX;
        this.radius += 0.5;
        if (this.radius > this.maxRadius - 5) {
            this.markedForDeletion = true;
        }
    }

    draw() {
        context.save();
        context.globalAlpha = 1 - this.radius / this.maxRadius;
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.restore();
    }
}

function drawScore() {
    context.fillStyle = "black";
    context.fillText("Score: " + score, 50, 75)
    context.fillStyle = "white";
    context.fillText("Score: " + score, 50, 80);
    context.fillStyle = "black";
    context.fillText("Lives: " + lives, 300, 75)
    context.fillStyle = "white";
    context.fillText("Lives: " + lives, 300, 80);
}

function drawGameOver() {
    context.textAlign = "center";
    context.fillStyle = "black";
    context.fillText("GAME OVER, your score is " + score, canvas.width * 0.5, canvas.height * 0.5 - 5);
    context.fillStyle = "lightgray";
    context.fillText("GAME OVER, your score is " + score, canvas.width * 0.5, canvas.height * 0.5);
}

const shotgunSound = new Audio();
shotgunSound.src = "assets/shotgun.wav";
let isReload = false;
shotgunSound.addEventListener("ended", () => isReload = false);

window.addEventListener("click", (e) => {
    if (isReload || lives < 1) {
        return;
    }
    isReload = true;
    shotgunSound.play();
    console.log(shotgunSound);
    const detectPixelColor = collisionCanvasContext.getImageData(e.x, e.y, 1, 1);
    const pc = detectPixelColor.data;
    ravens.forEach(obj => {
        if (obj.randomColors[0] === pc[0] &&
            obj.randomColors[1] === pc[1] &&
            obj.randomColors[2] === pc[2]) {
            obj.markedForDeletion = true;
            explosions.push(new Explosion(e.x, e.y, obj.width));
            score += (obj.hasTrail ? 5 : 1);
        }

    })
});

function animate(timestamp) {
    collisionCanvasContext.clearRect(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    let deltatime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    timeToNextRaven += deltatime;
    if (timeToNextRaven > ravenIntervalMs) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort((a, b) => a.width - b.width);
    };
    [...particles, ...ravens, ...explosions].forEach(obj => obj.update(deltatime));
    [...particles, ...ravens, ...explosions].forEach(obj => obj.draw());
    ravens = ravens.filter(obj => !obj.markedForDeletion);
    explosions = explosions.filter(obj => !obj.markedForDeletion);
    particles = particles.filter(obj => !obj.markedForDeletion);
    drawScore();
    if (lives > 0) {
        requestAnimationFrame(animate);
    } else {
        drawGameOver();
    }
}

animate(0);