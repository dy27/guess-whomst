from django.db import models
# import math

""" from django.contrib.postgres.fields import ArrayField

# Create your models here.


class Game(models.Model):
    game_id = models.IntegerField(default=0)
    names = ArrayField(models.TextField(default=None))
    board_size = models.IntegerField(default=24)
    n_characters = models.IntegerField(default=0)
    images = ArrayField(models.ImageField(default=None))
    flipped1 = ArrayField(models.BooleanField(default=False), size=24)
    flipped2 = ArrayField(models.BooleanField(default=False), size=24)
    turn = models.IntegerField(default=1)

    @classmethod
    def create(cls, game_id=0, names=None, board_size=24, images=None):
        game = cls(game_id=game_id,
                   names=names,
                   board_size=board_size,
                   images=images,
                   flipped1=[False for _ in range(board_size)],
                   flipped2=[False for _ in range(board_size)],
                   turn=1)
        return game

    def flip1(self, index):
        self.flipped1[index] = False if self.flipped1[index] else True

    def flip2(self, index):
        self.flipped1[index] = False if self.flipped1[index] else True

    def __str__(self):
        state1 = []
        for i in range(self.board_size):
            if i >= self.n_characters:
                state1.append('N')
            elif self.flipped1[i]:
                state1.append('T')
            else:
                state1.append('F')

        state2 = []
        for i in range(self.board_size):
            if i >= self.n_characters:
                state2.append('N')
            elif self.flipped2[i]:
                state2.append('T')
            else:
                state2.append('F')

        return str(state1) + '\n' + str(state2) """


# class Character(models.Model):
#     name = models.TextField(default=None)
#     image = models.ImageField(default=None)
#     flipped = models.BooleanField(default=False)
#
#     @classmethod
#     def create(cls, name=None, image=None):
#         character = cls(name=name,
#                         image=image,
#                         flipped=False)
#         return character
#
#     def flip(self):
#         self.flipped = False if self.flipped else True
#
#     def to_dict(self):
#         return {'name': self.name,
#                 'image': self.image,
#                 'flipped': self.flipped}
#
#
#
#
#
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
# class Board(models.Model):
#     rows = models.IntegerField(default=4)
#     cols = models.IntegerField(default=6)
#     size = models.IntegerField(default=0)
#     board = models.ManyToManyField(Character)
#     # board = models.ForeignKey(Character, on_delete=models.CASCADE)
#
#     @classmethod
#     def create(cls, names=None, images=None, shape=(4, 6)):
#
#         if shape is None:
#             size = len(names) if names is not None else 0
#             cols = math.ceil(math.sqrt(size))
#             rows = math.ceil(size / cols)
#         else:
#             rows = shape[0]
#             cols = shape[1]
#             size = len(names) if names is not None else 0
#
#         if names is None:
#             names = [None for _ in range(size)]
#         if images is None:
#             images = [None for _ in range(size)]
#
#         board = [Character() for _ in range(rows*cols)]
#
#         for i in range(rows * cols):
#             if i < size:
#                 board[i].name = names[i]
#                 board[i].image = images[i]
#             else:
#                 board[i].name = None
#                 board[i].image = None
#
#         return cls(rows=rows,
#                    cols=cols,
#                    size=size,
#                    board=board)
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
#     def __init__(self, game_id):
#         self.id = game_id
#         self.board1 = Board()
#         self.board2 = Board()
