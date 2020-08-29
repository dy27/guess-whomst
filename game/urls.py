from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    
    
    path(r'game/<int:game_id>/msg/send', views.game_msg_send, name='game_msg_send'),
    path(r'game/<int:game_id>/msg/get_all', views.game_msg_get_all, name='game_msg_get_all'),
    path(r'game/<int:game_id>/msg/get', views.game_msg_get, name='game_msg_get'),
    
    path(r'game/<int:game_id>/poll', views.game_poll, name='game_poll'),
    path(r'game/<int:game_id>/guess', views.game_guess, name='game_guess'),
    
    path(r'game/<int:game_id>/join/', views.join_game, name='join_game'),

    path(r'game/<int:game_id>/join/team', views.join_team, name='join_team'),

    path(r'game/<int:game_id>/send_img/', views.send_img, name='join_team'),
    path(r'game/<int:game_id>/send_img_metadata/', views.send_img_metadata, name='join_team'),

    path(r'game/create', views.create_game, name='game_msg_send'),
    path(r'game/<int:game_id>/start', views.start_game, name='start_game'),

    path(r'game/<int:game_id>/endQuestionTurn', views.end_question_turn, name='end_question_turn'),
    path(r'game/<int:game_id>/quit', views.quit_game, name='quit_game'),
    path(r'game/<int:game_id>/endAnswerTurn', views.end_answer_turn, name='end_answer_turn')
]