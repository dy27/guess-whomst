from django.db import models
# import math



# Create your models here.
from django.forms.models import model_to_dict
import json


# g = Game.create(10, names=['person1', 'person2', 'person3'])
class Game(models.Model):
    game_id = models.IntegerField(default=0)
    turn = models.IntegerField(default=0)

    @classmethod
    def create(cls, game_id=0, names=None, images=None, size=24):
        game = cls(game_id=game_id, turn=0)
        game.save()
        for i in range(2):
            Board.create(player=i, names=names, images=images, size=size, game=game)
        return game

    def get_board(self, player):
        return self.board_set.filter(player=player)[0]

    def __str__(self):
        return str(self.get_board(0)) + '\n' + str(self.get_board(1))

    def to_json(self):
        dict_obj = model_to_dict(self)

        board0 = self.get_board(0)
        board1 = self.get_board(1)
        dict_obj['board0'] = model_to_dict(board0)
        dict_obj['board1'] = model_to_dict(board1)

        c0 = []
        for i in range(board0.size):
            char_dict = model_to_dict(board0.get_character(i))
            char_dict.pop('image')
            c0.append(char_dict)

        c1 = []
        for i in range(board1.size):
            char_dict = model_to_dict(board1.get_character(i))
            char_dict.pop('image')
            c1.append(char_dict)

        # c0 = [model_to_dict(board0.get_character(i)) for i in range(board0.size)]
        # c1 = [model_to_dict(board1.get_character(i)) for i in range(board1.size)]

        dict_obj['board0']['characters'] = c0
        dict_obj['board1']['characters'] = c1

        return json.dumps(dict_obj)

    @classmethod
    def get_game(cls, game_id):
        return cls.objects.filter(game_id=game_id)[0]

    @classmethod
    def delete_all(cls):
        cls.objects.all().delete()


class Board(models.Model):
    player = models.IntegerField(default=0)
    size = models.IntegerField(default=24)
    n_characters = models.IntegerField(default=0)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)

    @classmethod
    def create(cls, player, names=None, images=None, size=24, game=None):

        n_characters = 0 if names is None else len(names)

        board = cls(player=player,
                    size=size,
                    n_characters=n_characters,
                    game=game)
        board.save()

        if images is None and n_characters != 0:
            images = [None for _ in range(n_characters)]

        for i in range(size):
            if i < n_characters:
                Character.create(name=names[i],
                                 index=i,
                                 image=images[i],
                                 board=board)
            else:
                Character.create(name="",
                                 index=i,
                                 image=None,
                                 board=board)
        return board

    def get_character(self, index):
        return self.character_set.filter(index=index)[0]

    def __str__(self):
        state = []
        for i in range(self.size):
            c = self.get_character(i)
            if c.name is "":
                state.append('N')
            elif c.flipped:
                state.append('T')
            else:
                state.append('F')
        return str(state)


class Character(models.Model):
    name = models.TextField(default="")
    index = models.IntegerField(default=None)
    image = models.ImageField(default=None)
    flipped = models.BooleanField(default=True)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)

    @classmethod
    def create(cls, name=None, index=None, image=None, flipped=True, board=None):
        character = cls(name=name,
                        index=index,
                        image=image,
                        flipped=flipped,
                        board=board)
        character.save()
        return character

    def flip(self):
        self.flipped = False if self.flipped else True
        self.save()


# class Board(models.Model):
#
#     rows = models.IntegerField(default=4)
#     cols = models.IntegerField(default=6)
#     size = models.IntegerField(default=0)
#     board = ArrayField(
#         ArrayField(
#             models.OneToOneField(
#                 'Character',
#                 on_delete=models.CASCADE
#             ),
#             size=6,
#         ),
#         size=4,
#     )
#
#     def init(self, names=None, images=None, shape=(4, 6)):
#
#         if shape is None:
#             self.size = len(names) if names is not None else 0
#             self.cols = math.ceil(math.sqrt(self.size))
#             self.rows = math.ceil(self.size / self.cols)
#         else:
#             self.rows = shape[0]
#             self.cols = shape[1]
#             self.size = len(names) if names is not None else 0
#
#         if names is None:
#             names = [None for _ in range(self.size)]
#         if images is None:
#             images = [None for _ in range(self.size)]
#
#         self.board = [[Character(None, None) for j in range(self.cols)] for i in range(self.rows)]
#
#         for i in range(self.rows):
#             for j in range(self.cols):
#                 self.print_board()
#                 index = i*self.cols + j
#                 print(i, j)
#                 if index < self.size:
#                     self.board[i][j].name = names[index]
#                     self.board[i][j].image = images[index]
#                     print("Char added")
#                 else:
#                     self.board[i][j].name = None
#                     self.board[i][j].image = None
#                     print('None added')
#
#     def flip(self, row, col):
#         self.board[row][col].flip()
#
#     def print_board(self):
#         grid = []
#         for row in self.board:
#             new_row = []
#             for c in row:
#                 if c.name is None:
#                     new_row.append('N')
#                 elif c.flipped:
#                     new_row.append('T')
#                 else:
#                     new_row.append('F')
#             grid.append(new_row)
#         print(grid)
#
#     def __str__(self):
#         grid = []
#         for row in self.board:
#             new_row = []
#             for c in row:
#                 if c.name is None:
#                     new_row.append('N')
#                 elif c.flipped:
#                     new_row.append('T')
#                 else:
#                     new_row.append('F')
#             grid.append(new_row)
#         return str(grid)











# class Game(models.Model):
#     game_id = models.IntegerField(default=0)
#     names = ArrayField(models.TextField(default=""), size=24)
#     board_size = models.IntegerField(default=24)
#     n_characters = models.IntegerField(default=0)
#     # images = ArrayField(models.ImageField(default=None))
#     # flipped1 = ArrayField(models.BooleanField(default=False), size=24)
#     # flipped2 = ArrayField(models.BooleanField(default=False), size=24)
#     turn = models.IntegerField(default=1)

# @classmethod
# def create(cls, game_id=0, names=None, board_size=24, images=None):
#     game = cls(game_id=game_id,
#                names=names,
#                board_size=board_size,
#                images=images,
#                flipped1=[False for _ in range(board_size)],
#                flipped2=[False for _ in range(board_size)],
#                turn=1)
#     return game
#
# def flip1(self, index):
#     self.flipped1[index] = False if self.flipped1[index] else True
#
# def flip2(self, index):
#     self.flipped1[index] = False if self.flipped1[index] else True
#
# def __str__(self):
#     state1 = []
#     for i in range(self.board_size):
#         if i >= self.n_characters:
#             state1.append('N')
#         elif self.flipped1[i]:
#             state1.append('T')
#         else:
#             state1.append('F')
#
#     state2 = []
#     for i in range(self.board_size):
#         if i >= self.n_characters:
#             state2.append('N')
#         elif self.flipped2[i]:
#             state2.append('T')
#         else:
#             state2.append('F')
#
#     return str(state1) + '\n' + str(state2)
