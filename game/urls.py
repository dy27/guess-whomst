from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    
    
    path(r'game/<int:game_id>/msg/send', views.game_msg_send, name='game_msg_send'),
    path(r'game/<int:game_id>/msg/get_all', views.game_msg_get_all, name='game_msg_get_all'),
    path(r'game/<int:game_id>/msg/get', views.game_msg_get, name='game_msg_get'),
    
    path(r'game/<int:game_id>/poll', views.game_poll, name='game_poll'),
    path(r'game/<int:game_id>/guess', views.game_guess, name='game_guess'),
    
    path(r'join/<int:game_id>/', views.join_game, name='join_game'),
    path(r'create', views.game_msg_send, name='game_msg_send'),
    path(r'join/<int:game_id>/team', views.join_team, name='join_team')
]