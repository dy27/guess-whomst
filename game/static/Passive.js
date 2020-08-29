class Passive extends Element {
    constructor(width, height, x, y, colour, ctx, text, fontsize) {
        super(width, height, x, y, colour, ctx);
        this.text = text;
        this.fontsize = fontsize;
    }

    draw() {
        ctx.beginPath();
        ctx.roundedRectangle(this.x, this.y, this.width, this.height, 10);
        ctx.stroke();
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.closePath();

        ctx.font = this.fontSize + "px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2 + 5);
    }
}
