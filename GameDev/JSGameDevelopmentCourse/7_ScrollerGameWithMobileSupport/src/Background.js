export default class Background {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = backgroundImg;
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 720;
        this.speed = 6;
        this.frameTimer = 0;
        this.frameInterval = 0;
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width - 2, this.y, this.width, this.height);
    }

    update(deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            this.x -= this.speed;
        } else {
            this.frameTimer += deltaTime;
        }

        if (this.x < 0 - this.width) {
            this.x = 0;
        }
    }
}