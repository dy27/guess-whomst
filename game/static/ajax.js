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
        post_request("game/" + game_id + "/msg/send", call_back, "application/json", JSON.stringify(request));


    }
};

