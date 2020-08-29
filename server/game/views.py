from django.shortcuts import render

# Create your views here.

def is_valid_game_id(id):
    #TODO check that the id is in the current server database
    return True

# View to check if user is already in a session
def index(request):

    game_id = ""

    # auto log in:
    if request.sessions.has_key("game_id"):
        game_id = request.sessions["game_id"]

        #check id is valid
        if is_valid_game_id(game_id):
            #return the game view
            return render(request, "game.html", {})
        else:
            del request.sessions["game_id"]
    
    # No session established on this host yet:
    return render(request, "join.html", {})



# Main game view
def game(request):
    return render(request, "game.html", {})