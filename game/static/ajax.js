game_id = 1;
user_id = 2; //TODO

function post_request(url , call_back, request_type, request_json) {

    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = call_back;

    httpRequest.open("POST", url, true);
    httpRequest.setRequestHeader("Content-Type",request_type);
    httpRequest.send(request_json);

}

document.body.onkeyup = function(event){

    if(local_data["game_id"] == -1) return;

    if(parseInt(local_data["turn"]) != player_number) return;

    var k = event.key || event.keyCode;
    if(local_data["game_ready"] == 1) {

        if(k === "Enter") {

            var call_back = function() {
                if(this.readyState == 4 && this.status == 200) {
                    console.log("Sent message : " + this.responseText);
                }
            };

            request = {"user_id":player_number, "content" : question_box._value};
            post_request("game/"+local_data["game_id"] + "/msg/send", call_back, "application/json", JSON.stringify(request));

            local_data["turn"] = parseInt(local_data["turn"] + 1) % 2;
        }

    } /* else {
        alert("Please wait for the other player/s to join the game! The game id is " + local_data["game_id"])
    } */
};


poll_period = 1000 // 1000 millis = 1 sec

function poll_server() {
    if(local_data["game_id"] == -1) return; // No assigned game id yet
    
    var call_back = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log("Game state (from server) : " + this.responseText);
            update_local_data(JSON.parse(this.responseText));
        }
    };

    post_request("game/"+local_data["game_id"] + "/poll", call_back, "application/json", "");

    call_back = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log("Game msgs (from server) : " + this.responseText);
            msgs = JSON.parse(this.responseText)
            active_msg = msgs[msgs.length-1]["content"];
            chatMsg._value = active_msg
        }
    };
    post_request("game/"+local_data["game_id"] + "/msg/get_all", call_back, "application/json", "");
}

/// Poll the server:
setInterval(poll_server, poll_period); 
