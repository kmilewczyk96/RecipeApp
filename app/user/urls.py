"""
URL mappings for the User API.
"""
from django.urls import include, path

from rest_framework.routers import DefaultRouter

from user import views


router = DefaultRouter()
router.register('user', views.UserViewSet)

app_name = 'user'
urlpatterns = [
    path('', include(router.urls)),
    path('token/', views.CreateTokenView.as_view(), name='token'),
]
