"""
URL mappings for the Recipe API.
"""
from django.urls import include, path

from rest_framework.routers import DefaultRouter

from recipe import views


router = DefaultRouter()
router.register('recipes', views.RecipeViewSet)

app_name = 'recipe'
urlpatterns = [
    path('', include(router.urls)),
    path('tags/', views.TagListView.as_view(), name='tag-list'),
    path('ingredients/', views.IngredientListView.as_view(), name='ingredient-list'),
    path('form-helpers/', views.RecipeFormHelpers.as_view(), name='form-helpers'),
]
