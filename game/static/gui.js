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
var played = 0;

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

// Create person objects
var pict_objects = new Array();
var options = new Array();
var action_buttons = new Array();
var reset_button = new Button(145, 40, 855, 320, ctx, "Reset");
var start_button = new Button(337, 45, 670, 630, ctx, "Start Game");
var join_button = new Button(100, 45, 890, 410, ctx, "Join Game");
var whomsts_no;
var question_box;
var chatMsg;

var numFaces = 24;
for (var r = 0; r < 4; r++) {
    for (var c = 0; c < 6; c++) {
        pict_objects[6 * r + c] = new Person("random", c*100, r*160, "AliceBlue", "None", ctx);
    }
}

var nameTagsEntries = new Array();

function draw_whomsts(){
    for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 6; c++) {
            if (6 * r + c < numFaces) {
                pict_objects[6 * r + c].draw();
            }
        }
    }
}


function create_name_texts(){

    for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 6; c++) {
            if (6 * r + c < numFaces) {

                //if (gameState == 0) {
                    nameTagsEntries[6*r+c] = new CanvasInput({
                        canvas: document.getElementById('canvas'),
                        fontSize: 12,
                        x: c*100 + 27,
                        y: r*160+20+170,
                        width: 54,
                        height: 12,
                        backgroundColor: "Azure",
                        borderColor: "CornflowerBlue",
                        placeHolder: 'Name...',
                        placeHolderColor: "gray",
                        innerShadow: "1px 1px 0px rgba(0,0,0,0)",
                        borderRadius: 3,
                        onsubmit: function (){
                            //alert('hi');
                            //alert(nameTagsEntries[6*r+c]._value);
                            pict_objects[6 * r + c].name = nameTagsEntries[6*r+c]._value;
                            //alert("Value: " + nameTagsEntries[6*r+c]._value + " Name: " + pict_objects[6 * r + c].name);
                        }

                    });
                //}
            } else {
                nameTagsEntries[6*r+c].destroy();
            }

        }
    }
}
if (gameState == 0) {
    drawStartBoard();
} else if (gameState > 0) {
    drawGameBoard();
}


function drawStartBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white"; // Background colour
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (played == 1){
        question_box.destroy();
        chatMsg.destroy();
    }
    create_name_texts();
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
    draw_whomsts();

    var x_elements = 670;

    // Game Explanation text
    drawString(ctx, "Welcome to Guess Whomst! In this online remake \nof the popular game Guess Who, your board is \nfilled in with famous celebrities by default.  However, \nyou can choose to reduce the number of Whomsts, \nand also customize the face and names of the \nvarious Whomsts. You can upload a new image, by \nclicking on a tile, and clicking the upload image \nbutton. You can also choose names by simply \ntyping into the respective text boxes.", x_elements, 45, "black", 0, "Arial", 15);

    // Number of whomsts text
    ctx.font = "20px Arial";
    ctx.fillStyle = "CornflowerBlue";
    ctx.fillText("Number of Whomsts (Max 24, Min 6):", x_elements, 300);

    // Number of Whomsts enter box
    whomsts_no = new CanvasInput({
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
        borderRadius: 10,
        onsubmit: function (){

            if (whomsts_no._value < 6 || whomsts_no._value > 24) {
                alert('Invalid number of whomsts, Try again!');
            } else {
                ctx.clearRect(0, 0, 640, canvas.height);
                ctx.fillStyle = "white"; // Background colour
                ctx.fillRect(0, 0, 640, canvas.height);
                ctx.font = "40px Arial";
                ctx.fillStyle = "CornflowerBlue";
                ctx.fillText("Guess Whomst?!", 155, 40);
                for (var i = 0; i < numFaces; i++) {
                    nameTagsEntries[i].destroy();
                }
                numFaces = whomsts_no._value;
                draw_whomsts();
                create_name_texts();
            }
        }

    });

    // Reset button
    reset_button.draw();

    // Players box outline
    var players_box = new Element(337, 200, x_elements, 400, "white", ctx);
    players_box.draw();

    // Players text
    ctx.font = "20px Arial";
    ctx.fillStyle = "CornflowerBlue";
    ctx.fillText("Players:", x_elements + 10, 430);

    // Start and join button
    start_button.draw();
    join_button.draw();
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

    whomsts_no.destroy();
    for (var i = 0; i < numFaces; i++) {
        nameTagsEntries[i].destroy();
    }
    played = 1;

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
    chatMsg = new CanvasInput({
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

function reset_tiles(){
    for (var r = 0; r < numFaces; r++) {
        pict_objects[r].active = true;
        pict_objects[r].colour = "AliceBlue";
    }
}

// Function to detect and act on mouse clicks
function mouseFunction(event) {

    if (gameState == 0) {

        if (reset_button.onpress(event) == true) {

        } else if (start_button.onpress(event) == true) {
            gameState = 1;
            drawGameBoard();

            var call_back = function() {
                if(this.readyState == 4 && this.status == 200) {
                    console.log("Sent message : " + this.responseText);
                }
            };

            if(local_data["game_id"] != -1) { // If a game has been created i.e. an id has been assigned

                request_data = {"num_players" : whomsts_no._value};

                post_request("game/"+local_data["game_id"]+"start/", call_back, "application/json", JSON.stringify(request_data));

                gameState = 1;
                drawGameBoard();
            }
            
        } else if (join_button.onpress(event) == true) {
            var call_back = function() {
                if(this.readyState == 4 && this.status == 200) {
                    console.log("Sent message : " + this.responseText);
                }
            };

            if(local_data["game_id"] != -1) { // If a game has been created i.e. an id has been assigned

                request_data = {"num_players" : whomsts_no._value};

                post_request("game/"+local_data["game_id"]+"join/", call_back, "application/json", JSON.stringify(request_data));

            }
        }

    } else if (gameState == 1) {
        for (var p = 0; p < numFaces; p++) {
            if (pict_objects[p].onpress(event) == true) {
                break;
            }
        }
        for (var o = 0; o < 3; o++) {
            if (action_buttons[o].onpress(event) == true) {
                if (o == 1){ // reset
                    reset_tiles();
                    draw_whomsts();
                    setTimeout(function(){
                        action_buttons[1].colour = "Azure";
                        action_buttons[1].active = true;
                        action_buttons[1].draw();
                    },100);

                } else if (o == 2){  // quit
                    gameState = 0;

                    numFaces = 24;
                    start_button.colour = "Azure";
                    reset_tiles();
                    drawStartBoard();

                    var call_back = function() {
                        if(this.readyState == 4 && this.status == 200) {
                            console.log("Sent message : " + this.responseText);
                        }
                    };

                    request = {"user_id":user_id, "content" : ""}
                    post_request("game/" + game_id + "/quit", call_back, "application/json", JSON.stringify(request));


                // End turn button
                } else {
                    gameState = 2;
                    setTimeout(function(){
                        action_buttons[0].colour = "Azure";
                        action_buttons[0].active = true;
                        action_buttons[0].draw();
                    },100);

                    var call_back = function() {
                        if(this.readyState == 4 && this.status == 200) {
                            console.log("Sent message : " + this.responseText);
                        }
                    };

                    request = {"user_id":user_id, "content" : ""}
                    post_request("game/" + game_id + "/endQuestionTurn", call_back, "application/json", JSON.stringify(request));

                }
                break;
            }
        }
    } else if (gameState == 2){
        for (var o = 0; o < 3; o++) {
            if (options[o].onpress(event) == true) {
                gameState = 1;
                setTimeout(function(){
                    options[o].colour = "Azure";
                    options[o].active = true;
                    options[o].draw();
                },100);

                var call_back = function() {
                    if(this.readyState == 4 && this.status == 200) {
                        console.log("Sent message : " + this.responseText);
                    }
                };

                request = {"user_id":user_id, "content" : o} // 0 = Yes, 1 = No, 2 = Unsure
                post_request("game/" + game_id + "/endQuestionTurn", call_back, "application/json", JSON.stringify(request));


                break;
            }
        }
        if (action_buttons[1].onpress(event) == true) {

            reset_tiles();
            draw_whomsts();
            setTimeout(function(){
                action_buttons[1].colour = "Azure";
                action_buttons[1].active = true;
                action_buttons[1].draw();
            },100);

        } else if (action_buttons[2].onpress(event) == true){
            gameState = 0;

            numFaces = 24;

            start_button.colour = "Azure";
            reset_tiles();
            drawStartBoard();

            var call_back = function() {
                if(this.readyState == 4 && this.status == 200) {
                    console.log("Sent message : " + this.responseText);
                }
            };

            request = {"user_id":user_id, "content" : ""}
            post_request("game/" + game_id + "/quit", call_back, "application/json", JSON.stringify(request));

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
