class Button extends Interactive {
    constructor(width, height, x, y, ctx, text) {
        super(width, height, x, y, "Azure", ctx);
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
        ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2 + 5);
        ctx.textAlign = "start";
    }

    action () {
        if (this.active == true) {
            this.colour = "CornflowerBlue";
            this.active = false;
        } else {
            this.colour = "Azure";
            this.active = true;
        }
        this.draw();
    }

}
