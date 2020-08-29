from django.shortcuts import render

# Create your views here.


# View to check if user is already in a session
def index(request):

    game_id = ""

    # auto log in:
    if request.sessions.has_key("game_id"):
        game_id = request.sessions["game_id"]
        #return the game view
        return render(request, "game.html", {})
    else:
        # No session established on this host yet:

        return render(request, "join.html", {})



# Main game view
def game(request):
    return render(request, "game.html", {})