from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Recipe
from recipe.serializers import (
    RecipeSerializer,
    RecipeDetailSerializer
)


RECIPES_URL = reverse('recipe:recipe-list')


def get_detail_url(recipe_id):
    return reverse('recipe:recipe-detail', args=[recipe_id])


def create_recipe(user, **params):
    DEFAULTS = {
        'user': user,
        'name': 'Some recipe',
        'time_minutes': 5,
        'description': 'Some description.'
    }
    DEFAULTS.update(params)
    recipe = Recipe.objects.create(**DEFAULTS)

    return recipe


class RecipePrivateAPITests(TestCase):
    """Test authenticated API requests."""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            email='user@example.com',
            password='Some_password123'
        )
        self.other_user = get_user_model().objects.create_user(
            email='other_user@example.com',
            password='Some_password123'
        )
        self.client.force_authenticate(user=self.user)

    def test_get_recipe_detail(self):
        """Test if authenticated Users can access recipes created by others."""
        recipe = create_recipe(user=self.other_user)

        url = get_detail_url(recipe.id)
        res = self.client.get(url)

        serializer = RecipeDetailSerializer(recipe)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_recipe(self):
        """Test if creating recipe with valid data is successful."""
        res = self.client.post(RECIPES_URL, data={
            'name': 'Some dish',
            'time_minutes': 25,
            'description': 'Some description.'
        })
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        recipe = Recipe.objects.get(id=res.data['id'])
        self.assertEqual(recipe.user, self.user)

    def test_recipe_filter_by_user(self):
        """Test if filter params are applied correctly."""
        recipe1 = create_recipe(user=self.user)
        recipe1 = RecipeSerializer(recipe1)
        recipe2 = create_recipe(user=self.other_user, name='some other dish')
        recipe2 = RecipeSerializer(recipe2)

        params = {'users': {self.other_user.id}}
        res = self.client.get(RECIPES_URL, params)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertNotIn(recipe1.data, res.data)
        self.assertIn(recipe2.data, res.data)
        self.assertEqual(len(res.data), 1)
