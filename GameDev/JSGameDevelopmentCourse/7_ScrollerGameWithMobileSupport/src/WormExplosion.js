export default class WormExplosion {
    constructor(x, y, size) {
        this.image = wormExplosionImg;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        // this.sound = new Audio();
        // this.sound.src = "assets/boom.wav";
        this.timeSinceLastFrame = 0;
        this.frameInterval = 100;
        this.frame = 0;
        this.framesCount = 5;
        this.markedForDeletion = false;
    }

    update(deltatime) {
        // if (this.frame === 0) {
        //     this.sound.play();
        // }
        if (this.frame > this.framesCount) {
            this.markedForDeletion = true;
        }
        this.timeSinceLastFrame += deltatime;
        if (this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            this.timeSinceLastFrame = 0;
        }
    }

    draw(context) {
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