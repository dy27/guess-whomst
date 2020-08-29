from django.db import models
import math


# Create your models here.

class Character(models.Model):
    name = models.TextField(default=None)
    image = models.ImageField(default=None)
    flipped = models.BooleanField(default=False)

    # def __init__(self, name, image):
    #     self.name = name
    #     self.image = image
    #     self.flipped = False

    def flip(self):
        self.flipped = False if self.flipped else True

    def to_dict(self):
        return {'name': self.name,
                'image': self.image,
                'flipped': self.flipped}


class Board(models.Model):
    def __init__(self, names=None, images=None, shape=(4, 6)):

        if shape is None:
            self.size = len(names) if names is not None else 0
            self.cols = math.ceil(math.sqrt(self.size))
            self.rows = math.ceil(self.size / self.cols)
        else:
            self.rows = shape[0]
            self.cols = shape[1]
            self.size = len(names) if names is not None else 0

        if names is None:
            names = [None for _ in range(self.size)]
        if images is None:
            images = [None for _ in range(self.size)]

        self.board = [[Character(None, None) for j in range(self.cols)] for i in range(self.rows)]

        for i in range(self.rows):
            for j in range(self.cols):
                self.print_board()
                index = i*self.cols + j
                print(i, j)
                if index < self.size:
                    self.board[i][j].name = names[index]
                    self.board[i][j].image = images[index]
                    print("Char added")
                else:
                    self.board[i][j].name = None
                    self.board[i][j].image = None
                    print('None added')

    def flip(self, row, col):
        self.board[row][col].flip()

    def print_board(self):
        grid = []
        for row in self.board:
            new_row = []
            for c in row:
                if c.name is None:
                    new_row.append('N')
                elif c.flipped:
                    new_row.append('T')
                else:
                    new_row.append('F')
            grid.append(new_row)
        print(grid)

    def __str__(self):
        grid = []
        for row in self.board:
            new_row = []
            for c in row:
                if c.name is None:
                    new_row.append('N')
                elif c.flipped:
                    new_row.append('T')
                else:
                    new_row.append('F')
            grid.append(new_row)
        return str(grid)


class Game(models.Model):
    def __init__(self, game_id):
        self.id = game_id
        self.board1 = Board()
        self.board2 = Board()


