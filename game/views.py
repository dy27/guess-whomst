import json
from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse


# def hello(request):
#     return HttpResponse("Hello, world. You're at the polls index.")


# from game.models import Board, Character, Game
# from game.models import Character


def index(request):
    return render(request, "game.html", {})

# def index(request):
#     b = Board(['name'], None)
#     b.save()
#     b1 = Board.objects.all()
#     # g = Game(5)
#     # g1 = Game.objects.get(id=5)
#     print(b1)
#     return HttpResponse(str(b1))


def is_valid_game_id(id):
    # TODO check that the id is in the current server database
    return True


# View to check if user is already in a session
# def index(request):
#     game_id = ""
#
#     # auto log in:
#     if request.sessions.has_key("game_id"):
#         game_id = request.sessions["game_id"]
#
#         # check id is valid
#         if is_valid_game_id(game_id):
#             # return the game view
#             return render(request, "game.html", {})
#         else:
#             del request.sessions["game_id"]
#
#     # No session established on this host yet:
#     return render(request, "join.html", {})
#
#
# # Main game view
# def game(request):
#     return render(request, "game.html", {})




################## Random helper functions



### json_to_dict for responses
def json_to_dict(json_str, expected_fields=[]):
    json_dict = json.loads(json_str)
    for field in expected_fields:
        if field not in json_dict: json_dict[field] = "None"

    return json_dict

def check_game_id(game_id):
    #TODO check if game_id is in database
    return True

def game_json_from_id(game_id):
    #TODO return the database object modle thingy
    return {}

def check_win(face_id_guessed, game_id):
    game_json = game_json_from_id(game_id) #TODO un-mock

    #TODO
    return False



################## AJAX views

def game_msg_send(request, game_id):

    if not check_game_id(game_id): return HttpResponse("Invalid game ID!")

    json_dict = json_to_dict(request.body, ["user_id","content"])
    
    print("game_msg_send: Received msg from %s : %s" % (json_dict["user_id"], json_dict["content"]))

    return HttpResponse("Success!") #TODO


def game_msg_get_all(request, game_id):
    if not check_game_id(game_id): return HttpResponse("Invalid game ID!")

    print("game_msg_get_all: Sending all msgs for game: %s" % (game_id))

    #messages = {[{"TEST_msg" : {"user_id":"blue", "content":"Hello there", "msg_id":294}}]} #TODO un-mock
    messages = '[{"TEST_msg" : {"user_id":"blue", "content":"Hello there", "msg_id":294}}]' #TODO un-mock

    return HttpResponse(messages, content_type="application/json")


def game_msg_get(request, game_id):
    if not check_game_id(game_id): return HttpResponse("Invalid game ID!")

    json_dict = json_to_dict(request.body, ["msg_id"])
    msg_id = json_dict["msg_id"]

    messages = {} #TODO un-mock

    if msg_id not in messages:
        print("game_msg_get: No such or bad msg_id requested")
        return HttpResponse("No such or bad msg_id!")
    else:
        msg = messages[msg_id]
        print("game_msg_get: Sending msg (%d) for game: %s" % (msg_id, game_id)) #TODO log msg contents
        msg_json = json.dumps(msg)
        
        return HttpResponse(msg_json, content_type="application/json")

def game_poll(request, game_id):
    if not check_game_id(game_id): return HttpResponse("Invalid game ID!")

    game_json = game_json_from_id(game_id) #TODO un-mock

    print("game_poll: Sending game data for game: %s" % (game_id))
    
    return HttpResponse(game_json, content_type="application/json")


def game_guess(request, game_id):
    if not check_game_id(game_id): return HttpResponse("Invalid game ID!")
    
    json_dict = json_to_dict(request.body, ["user_id","face_id"]) # face_id is their guess
    
    print("game_guess: Received guess from %s : face with id %d" % (json_dict["user_id"], json_dict["face_id"]))

    if check_win(json_dict["face_id"], game_id):
        return HttpResponse("correct")
        #TODO Win state!
    else:
        return HttpResponse("incorrect")
        

def join_game(request, game_id):
    if not check_game_id(game_id): return HttpResponse("Invalid game ID!")

    json_dict = json_to_dict(request.body, ["user_id","content"])
    
    print("join_game: Received join from %s for game id %s" % (json_dict["user_id"], game_id))

    return HttpResponse("Todo!")

def create_game(request):
    json_dict = json_to_dict(request.body, ["user_id"])
    
    print("join_game: Received create game from %s" % (json_dict["user_id"]))

    return HttpResponse("Todo!")

def join_team(request, game_id):
    if not check_game_id(game_id): return HttpResponse("Invalid game ID!")

    json_dict = json_to_dict(request.body, ["user_id"])
    
    print("join_game: Received join from %s for game id %s" % (json_dict["user_id"], game_id))

    return HttpResponse("Todo!")




