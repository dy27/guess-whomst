class Person {
    constructor(p_name, x, y, colour, img) {
        this.name = p_name;
        this.pict_width = 64;
        this.pict_height = 95;
        this.name_width = 64;
        this.name_height = 19;
        this.x = x;
        this.y = y;
        this.active = true;
        this.colour = colour;
        this.pict_state = false;
        this.pict_img = img;
    }
}
