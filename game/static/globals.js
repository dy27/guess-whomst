// Local_data starts off with defaults:
local_data = {

    "game_id" : -1,
    "turn" : 0,
    "board0" : {
        "id" : -1,
        "player" : -1,
        "size" : 24,
        "n_characters" : 3,
        "characters" : [

        ]
    },
    "board1" : {
        "id" : -1,
        "player" : -1,
        "size" : 24,
        "n_characters" : 3,
        "characters" : [
            
        ]
    }

};

function update_local_data(new_data) {
    local_data = new_data
}