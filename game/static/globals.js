// Local_data starts off with defaults:
local_data = {

    "game_id" : -1,
    "game_ready": 0,
    "turn" : 0

};

player_number = -1;
msgs = []
active_msg = ""
chatMsg = {"_value" : ""}

function update_local_data(new_data) {
    local_data = new_data
}