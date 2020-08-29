from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse


# def hello(request):
#     return HttpResponse("Hello, world. You're at the polls index.")


from django.http import HttpResponse

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
