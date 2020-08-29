class Button extends Interactive {
    constructor(x, y, ctx, text) {
        super(84, 45, x, y, "Azure", ctx);
        this.text = text;
    }

    draw() {

        ctx.beginPath();
        ctx.roundedRectangle(this.x, this.y, this.width, this.height, 10);
        ctx.stroke();
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.closePath();

        ctx.font = "18px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x + 42, this.y + 30);
    }
}
