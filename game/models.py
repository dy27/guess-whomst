from django.db import models
from django.forms.models import model_to_dict
import json


class Game(models.Model):
    game_id = models.IntegerField(default=0)
    turn = models.IntegerField(default=0)
    size = models.IntegerField(default=0)
    game_ready = models.IntegerField(default=0)

    @classmethod
    def create(cls, game_id, names, images=None):
        size = len(names)
        game = cls(game_id=game_id,
                   turn=0,
                   size=size)
        game.save()

        if images is None and size != 0:
            images = [None for _ in range(size)]

        for i in range(size):
            if i < size:
                Character.create(name=names[i],
                                 index=i,
                                 image=images[i],
                                 game=game)
            else:
                Character.create(name="",
                                 index=i,
                                 image=None,
                                 game=game)
        return game

    def to_json(self):
        dict_obj = model_to_dict(self)

        characters = []
        for i in range(self.size):
            char_dict = model_to_dict(self.get_character(i))
            char_dict.pop('image')
            characters.append(char_dict)

        dict_obj['characters'] = characters
        return json.dumps(dict_obj)

    def get_character(self, index):
        return self.character_set.filter(index=index)[0]

    @classmethod
    def get_game(cls, game_id):
        return cls.objects.filter(game_id=game_id)[0]

    @classmethod
    def delete_all(cls):
        cls.objects.all().delete()


class Character(models.Model):
    name = models.TextField(default="")
    index = models.IntegerField(default=None)
    image = models.ImageField(default=None)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)

    @classmethod
    def create(cls, name=None, index=None, image=None, game=None):
        character = cls(name=name,
                        index=index,
                        image=image,
                        game=game)
        character.save()
        return character
