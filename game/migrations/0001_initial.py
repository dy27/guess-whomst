<<<<<<< HEAD
# Generated by Django 3.1 on 2020-08-29 14:32
=======
# Generated by Django 3.1 on 2020-08-29 03:10
>>>>>>> eec09f0a9596279b5982c089153a0ca9095fbc7b

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Board',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
<<<<<<< HEAD
                ('player', models.IntegerField(default=0)),
                ('size', models.IntegerField(default=24)),
                ('n_characters', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('game_id', models.IntegerField(default=0)),
                ('turn', models.IntegerField(default=0)),
=======
            ],
        ),
        migrations.CreateModel(
            name='Character',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
>>>>>>> eec09f0a9596279b5982c089153a0ca9095fbc7b
            ],
        ),
        migrations.CreateModel(
            name='Character',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(default=None)),
                ('index', models.IntegerField(default=None)),
                ('image', models.ImageField(default=None, upload_to='')),
                ('flipped', models.BooleanField(default=False)),
                ('board', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.board')),
            ],
        ),
        migrations.AddField(
            model_name='board',
            name='game',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.game'),
        ),
    ]
