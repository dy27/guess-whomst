user_id = 0; //TODO


/// Reference
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
        pict_objects[4*r + c] = new Person("random", r * 100, c * 180, "AliceBlue", "None", ctx);
    }
}


// Detect mouse press
canvas.addEventListener("click", mouseFunction, false);

// Draw the person objects (pictures + nametags)
for (var r = 0; r < 6; r++) {

    for (var c = 0; c < 4; c++) {
        pict_objects[4*r+c].draw();
    }
}

var x_elements = 684;

// Your person text
ctx.font = "24px Arial";
ctx.fillStyle = "black";
ctx.fillText("Your Person:", x_elements, 45);

// Person box
var your_pers = new Element(337, 45, x_elements, 65, "Azure", ctx);
your_pers.draw();

// Person name
ctx.font = "20px Arial";
ctx.fillStyle = "black";
ctx.fillText("Default", x_elements + 10, 95);

// Question text
ctx.font = "24px Arial";
ctx.fillStyle = "black";
ctx.fillText("Question:", x_elements, 170);

// Question box
question_box = new CanvasInput({
    canvas: document.getElementById('canvas'),
    fontSize: 18,
    x: x_elements,
    y: 190,
    width: 322,
    height: 30,
    backgroundColor: "Azure",
    borderColor: "CornflowerBlue",
    placeHolder: 'Enter question here...',
    placeHolderColor: "gray",
    innerShadow: "1px 1px 0px rgba(0,0,0,0)",
    boxShadow: "1px 1px 0px rgba(0,0,0,0)",
    borderRadius: 0
});

// Answer text
ctx.font = "24px Arial";
ctx.fillStyle = "black";
ctx.fillText("Answer:", x_elements, 285);

// Answer options
var options = new Array();
var text_opts = new Array("Yes", "No", "Unsure");
for (var o = 0; o < 3; o++) {
    options[o] = new Button(x_elements + o * 126, 305, ctx, text_opts[o]);
    options[o].draw();
}

// Game buttons
var action_buttons = new Array();
var button_texts = new Array("End Turn", "Reset", "Quit");
for (var o = 0; o < 3; o++) {
    action_buttons[o] = new Button(x_elements + o * 126, 650, ctx, button_texts[o]);
    action_buttons[o].draw();
}

function mouseFunction(event) {
    for (var p = 0; p < 24; p++) {
        if (pict_objects[p].onpress(event) == true) {
            break;
        }
    }
    for (var o = 0; o < 3; o++) {
        if (options[o].onpress(event) == true || action_buttons[o].onpress(event) == true) {
            break;
        }
    }
}


document.body.onkeyup = function(event){

    var k = event.key || event.keyCode;
    if(k === "Enter") {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                console.log("Sent message : " + this.responseText);
            }
        };

        httpRequest.open("POST", "game/" + user_id + "/msg/send", true);
        httpRequest.send("user_id=" + user_id+"&content=" + question_box._value);       
    }
};
