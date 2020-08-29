class Person extends Interactive {
    constructor(p_name, x, y, colour, img, ctx) {
        super(64, 95, x + 30, y + 80, colour, ctx);
        this.name = p_name;
        this.name_width = 64;
        this.name_height = 19;
        this.pict_state = false;
        this.pict_img = img;
    }

    draw() {
        ctx.beginPath();
        ctx.roundedRectangle(this.x, this.y, this.width, this.height, 10);
        ctx.stroke();
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.closePath();

        if (gameState == 1 || gameState == 2) {
            ctx.beginPath();
            ctx.roundedRectangle(this.x, this.y + 20 + this.height, this.name_width, this.name_height, 6);
            ctx.stroke();
            ctx.fillStyle = this.colour;
            ctx.fill();
            ctx.closePath();

            ctx.font = "12px Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(this.name, this.x + this.width/2, this.y + this.height/2 + 80);
            ctx.textAlign = "start";

        }
    }

    action () {


        if (this.active == true) {
            this.colour = "CornflowerBlue";
            this.active = false;
        } else {
            this.colour = "AliceBlue";
            this.active = true;
        }
        this.draw();

    }
}
