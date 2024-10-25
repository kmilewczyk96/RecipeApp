from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Ingredient


INGREDIENTS_URL = reverse('recipe:ingredient-list')


class PublicIngredientAPITests(TestCase):
    """Test unauthenticated API requests."""

    def setUp(self):
        self.client = APIClient()

    def test_get_ingredients(self):
        """Test if data is restricted to unauthorized users."""
        Ingredient.objects.create(
            name='Some ingredient',
            kcal_per_100_units=100,
        )
        res = self.client.get(INGREDIENTS_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
