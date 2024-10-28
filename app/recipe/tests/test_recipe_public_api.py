from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Recipe


RECIPES_URL = reverse('recipe:recipe-list')


def get_detail_url(recipe_id):
    return reverse('recipe:recipe-detail', args=[recipe_id])


def create_recipe(user, **params):
    DEFAULTS = {
        'user': user,
        'name': 'Some recipe',
        'time_minutes': 5,
    }
    DEFAULTS.update(params)
    recipe = Recipe.objects.create(**DEFAULTS)

    return recipe


class RecipePublicAPITests(TestCase):
    """Test unauthenticated API requests."""

    def setUp(self):
        self.client = APIClient()

    def test_get_recipes(self):
        """Test if data is restricted to unauthorized users."""
        user = get_user_model().objects.create_user(
            email='test@example.com',
            password='Some_password123'
        )
        create_recipe(user=user)

        res = self.client.get(RECIPES_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
