from django.db import models
import math


# Create your models here.

class Character(models.Model):
    def __init__(self, name, image):
        self.name = name
        self.image = image
        self.flipped = False

    def flip(self):
        self.flipped = False if self.flipped else True


class Board(models.Model):
    def __init__(self, names, images, shape=(4, 6)):

        if shape is None:
            self.size = len(names)
            self.cols = math.ceil(math.sqrt(self.size))
            self.rows = math.ceil(self.size / self.cols)
        else:
            self.rows = shape[0]
            self.cols = shape[1]
            self.size = self.rows * self.cols

        if names is None:
            names = [None for _ in range(self.size)]
        if images is None:
            images = [None for _ in range(self.size)]

        self.board = []
        for i in range(self.rows):
            self.board.append([])
            print(self.board)
            for j in range(self.cols):
                index = i*self.cols + j
                print(i, j)
                if index < self.size:
                    self.board[i].append(Character(names[index], images[index]))
                    print("Char added")
                else:
                    self.board[i].append(Character(None, None))
                    print('None added')

        self.board = [[Character(names[i][j], images[i][j]) for j in range(self.cols)] for i in range(self.rows)]

    def flip(self, row, col):
        self.board[row][col].flip()

    def __str__(self):
        grid = [['T' if c.flipped else 'F' for c in row] for row in self.board]
        return str(grid)

