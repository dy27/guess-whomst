class Element {
    constructor(width, height, x, y, colour, ctx) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.ctx = ctx;
    }

    draw() {
        ctx.beginPath();
        ctx.roundedRectangle(this.x, this.y, this.width, this.height, 10);
        ctx.stroke();
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.closePath();
    }
}
