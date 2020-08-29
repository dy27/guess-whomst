class Interactive extends Element {
    constructor(width, height, x, y, colour, ctx) {
        super(width, height, x, y, colour, ctx);
        this.active = true;
    }

    onpress(event) {
        // Check within bounds
        // Action
        var eventX = event.x - canvas.offsetLeft;
        var eventY = event.y - canvas.offsetTop;

        // return true or false
        if (eventX < this.x || eventX > this.x + this.width || eventY < this.y || eventY > this.y + this.height) {
            return false;
        }


        this.action()
        return true;
    }

    action () {

    }

}
