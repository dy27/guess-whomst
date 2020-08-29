// Function to draw a rounded rectangle
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

var gameState = 0; // 0 = start menu, 1 = asking question, 2 = answering question

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

/*
<label>Image File:</label><br/>
<input type="file" id="imageLoader" name="imageLoader"/>


var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 30, 20, 64, 95);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}
*/

// Detect mouse press
canvas.addEventListener("click", mouseFunction, false);

// Number of faces
var numFaces = 24;

// Create person objects
var pict_objects = new Array();
for (var r = 0; r < 6; r++) {
    for (var c = 0; c < 4; c++) {
        pict_objects[4*r + c] = new Person("random", r * 100, c * 160, "AliceBlue", "None", ctx);
    }
}
var options = new Array();
var action_buttons = new Array();
var reset_button = new Button(145, 40, 855, 320, ctx, "Reset");
var start_button = new Button(337, 45, 670, 630, ctx, "Start Button");

if (gameState == 0) {
    drawStartBoard();
} else if (gameState == 1) {
    drawGameBoard();
}

function drawStartBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white"; // Background colour
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Vertical line
    ctx.beginPath();
    ctx.moveTo(644, 0);
    ctx.lineTo(644, canvas.height);
    ctx.strokeStyle = "CornflowerBlue";
    ctx.stroke();
    ctx.closePath();

    // Game Title
    ctx.font = "40px Arial";
    ctx.fillStyle = "CornflowerBlue";
    ctx.fillText("Guess Whomst?!", 155, 40);

    // Draw the person objects (pictures + nametags)
    for (var r = 0; r < numFaces; r++) {
        pict_objects[r].draw();
    }

    var x_elements = 670;

    // Game Explanation text
    drawString(ctx, "Welcome to Guess Whomst! In this online remake \nof the popular game Guess Who, your board is \nfilled in with famous celebrities by default.  However, \nyou can choose to reduce the number of Whomsts, \nand also customize the face and names of the \nvarious Whomsts. You can upload a new image, by \nclicking on a tile, and clicking the upload image \nbutton. You can also choose names by simply \ntyping into the respective text boxes.", x_elements, 45, "black", 0, "Arial", 15);

    // Number of whomsts text
    ctx.font = "20px Arial";
    ctx.fillStyle = "CornflowerBlue";
    ctx.fillText("Number of Whomsts (Max 24, Min 6):", x_elements, 300);

    // Number of Whomsts enter box
    var whomsts_no = new CanvasInput({
        canvas: document.getElementById('canvas'),
        fontSize: 18,
        x: x_elements,
        y: 320,
        width: 130,
        height: 30,
        backgroundColor: "Azure",
        borderColor: "CornflowerBlue",
        placeHolder: 'Enter here...',
        placeHolderColor: "gray",
        innerShadow: "1px 1px 0px rgba(0,0,0,0)",
        borderRadius: 10
    });

    // Reset button
    reset_button.draw();

    // Players box outline
    var players_box = new Element(337, 200, x_elements, 400, "white", ctx);
    players_box.draw();

    // Players text
    ctx.font = "20px Arial";
    ctx.fillStyle = "CornflowerBlue";
    ctx.fillText("Players:", x_elements + 50, 430);

    // Start button
    start_button.draw();

}

function drawString(ctx, text, posX, posY, textColor, rotation, font, fontSize) {
	var lines = text.split("\n");
	if (!rotation) rotation = 0;
	if (!font) font = "'serif'";
	if (!fontSize) fontSize = 16;
	if (!textColor) textColor = '#000000';
	ctx.save();
	ctx.font = fontSize + "px " + font;
	ctx.fillStyle = textColor;
	ctx.translate(posX, posY);
	ctx.rotate(rotation * Math.PI / 180);
	for (i = 0; i < lines.length; i++) {
 		ctx.fillText(lines[i],0, i*(fontSize + 10));
	}
	ctx.restore();
}

function drawGameBoard() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white"; // Background colour
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Vertical line
    ctx.beginPath();
    ctx.moveTo(644, 0);
    ctx.lineTo(644, canvas.height);
    ctx.strokeStyle = "CornflowerBlue";
    ctx.stroke();
    ctx.closePath();

    // Game Title
    ctx.font = "40px Arial";
    ctx.fillStyle = "CornflowerBlue";
    ctx.fillText("Guess Whomst?!", 155, 40);

    // Draw the person objects (pictures + nametags)
    for (var r = 0; r < numFaces; r++) {
        pict_objects[r].draw();
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
    var input = new CanvasInput({
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
    var text_opts = new Array("Yes", "No", "Unsure");
    for (var o = 0; o < 3; o++) {
        options[o] = new Button(84, 45, x_elements + o * 126, 305, ctx, text_opts[o]);
        options[o].draw();
    }

    // Game buttons

    var button_texts = new Array("End Turn", "Reset", "Quit");
    for (var o = 0; o < 3; o++) {
        action_buttons[o] = new Button(84, 45, x_elements + o * 126, 650, ctx, button_texts[o]);
        action_buttons[o].draw();
    }

    // Chat message box
    var chatMsg = new CanvasInput({
        canvas: document.getElementById('canvas'),
        fontSize: 18,
        x: x_elements,
        y: 580,
        width: 322,
        height: 30,
        backgroundColor: "Azure",
        borderColor: "CornflowerBlue",
        placeHolder: 'Enter chat here...',
        placeHolderColor: "gray",
        innerShadow: "1px 1px 0px rgba(0,0,0,0)",
        boxShadow: "1px 1px 0px rgba(0,0,0,0)",
        borderRadius: 0
    });

    var chat_box = new Element(337, 200, x_elements, 365, "White", ctx);
    chat_box.draw();
}

// Function to detect and act on mouse clicks
function mouseFunction(event) {

    if (gameState == 0) {
        if (reset_button.onpress(event) == true) {

        }
        if (start_button.onpress(event) == true) {
            gameState = 1;
            drawGameBoard();

        }

    } else if (gameState == 1 || gameState == 2) {
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
