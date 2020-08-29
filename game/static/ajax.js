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

    var k = event.key || event.keyCode;
    if(k === "Enter") {

        var call_back = function() {
            if(this.readyState == 4 && this.status == 200) {
                console.log("Sent message : " + this.responseText);
            }
        };

        request = {"user_id":user_id, "content" : question_box._value}
        post_request(game_id + "/msg/send", call_back, "application/json", JSON.stringify(request));


    }
};


/// Poll the server:
setTimeout(function(){ 

    if(local_data["game_id"] == -1) return; // No assigned game id yet
    
    var call_back = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log("Game state (from server) : " + this.responseText);
        }
    };

    post_request("game/"+local_data["game_id"] + "/poll", call_back, "application/json", "");


}, 1000); // 1000 millis = 1 sec