from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Ingredient
from recipe.serializers import IngredientSerializer


INGREDIENTS_URL = reverse('recipe:ingredient-list')


def create_ingredient(**params):
    INGREDIENT = {
        'name': 'Some Ingredient',
        'kcal_per_100_units': 100,
    }
    INGREDIENT.update(**params)

    return Ingredient.objects.create(**INGREDIENT)


class PrivateIngredientAPITests(TestCase):
    """Test authenticated API requests."""

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            email='user@example.com',
            password='Password123',
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_get_ingredient_list(self):
        """Tests if get request returns expected response."""
        ingredients = [create_ingredient(name=name) for name in ('avocado', 'egg', 'potato')]
        serializer = IngredientSerializer(ingredients, many=True)

        res = self.client.get(INGREDIENTS_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)
