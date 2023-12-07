from django.urls import path
from . import views

urlpatterns = [
    path('addNewPost/', views.addNewPost),
    path('postsList/', views.getPosts),
    path('upload/', views.upload),
]