"""
URL mappings for the User API.
"""
from django.urls import path

from user import views


app_name = 'user'
urlpatterns = [
    path('users/', views.UserView.as_view(), name='list-create'),
    path('users/<pk>/', views.UserDetailView.as_view(), name='details'),
    path('token/', views.CreateTokenView.as_view(), name='token'),
    path('me/', views.AuthUserDetailView.as_view(), name='me'),
]
