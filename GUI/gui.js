CanvasRenderingContext2D.prototype.roundedRectangle = function(x, y, width, height, roundedness) {
  const radiansInCircle = 2 * Math.PI;
  const halfRadians = (2 * Math.PI)/2;
  const quarterRadians = (2 * Math.PI)/4;


  this.arc(roundedness + x, roundedness + y, roundedness, - quarterRadians, halfRadians, true);
  this.lineTo(x, y + height - roundedness);
  this.arc(roundedness + x, height - roundedness + y, roundedness, halfRadians, quarterRadians, true);
  this.lineTo(x + width - roundedness, y + height);
  this.arc(x + width - roundedness, y + height - roundedness, roundedness, quarterRadians, 0, true);
  this.lineTo(x + width, y + roundedness);
  this.arc(x + width - roundedness, y + roundedness, roundedness, 0, -quarterRadians, true);
  this.lineTo(x + roundedness, y);
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "white"; // Background colour
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Vertical line
ctx.beginPath();
ctx.moveTo(644, 0);
ctx.lineTo(644, canvas.height);
ctx.strokeStyle = "CornflowerBlue";
ctx.stroke();
ctx.closePath();

// Create person objects
var pict_objects = new Array();
for (var r = 0; r < 6; r++) {
    for (var c = 0; c < 4; c++) {
        pict_objects[4*r + c] = new Person("random", r * 100, c * 180, "AliceBlue", "None");
    }
}

// Draw the person objects (pictures + nametags)
for (var r = 0; r < 6; r++) {

    for (var c = 0; c < 4; c++) {
        ctx.beginPath();
        ctx.roundedRectangle(pict_objects[4*r+c].x + 30, pict_objects[4*r+c].y + 15,
            pict_objects[4*r+c].pict_width, pict_objects[4*r+c].pict_height, 10);
        ctx.stroke();
        ctx.fillStyle = pict_objects[4*r+c].colour;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.roundedRectangle(pict_objects[4*r+c].x + 30, pict_objects[4*r+c].y + 35 + pict_objects[4*r+c].pict_height
            , pict_objects[4*r+c].name_width, pict_objects[4*r+c].name_height, 6);
        ctx.stroke();
        ctx.fillStyle = pict_objects[4*r+c].colour;
        ctx.fill();
        ctx.closePath();
    }
}
