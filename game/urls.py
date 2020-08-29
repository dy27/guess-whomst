from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    
    
    path(r'<int:game_id>/msg/send', views.game_msg_send, name='game_msg_send'),
    path(r'<int:game_id>/msg/get_all', views.game_msg_get_all, name='game_msg_get_all'),
    path(r'<int:game_id>/msg/get', views.game_msg_get, name='game_msg_get'),
    
    path(r'<int:game_id>/poll', views.game_poll, name='game_poll'),
    path(r'<int:game_id>/guess', views.game_guess, name='game_guess'),
    
    path(r'<int:game_id>/join/', views.join_game, name='join_game'),
    path(r'create', views.game_msg_send, name='game_msg_send'),

    path(r'<int:game_id>/join/team', views.join_team, name='join_team'),

    """ path(r'<int:game_id>/send_img/', views.send_img, name='join_team'),
    path(r'<int:game_id>/send_img_metadata/', views.send_img_metadata, name='join_team') """
]