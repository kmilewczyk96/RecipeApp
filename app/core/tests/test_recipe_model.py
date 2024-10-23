from django.contrib.auth import get_user_model
from django.test import TestCase

from core import models


class RecipeModelTests(TestCase):
    """Tests for Recipe model."""

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            name='TestUser',
            email='test@example.com',
            password='some_password123'
        )

    def test_create_recipe_success(self):
        """Test if creating a valid recipe is successful."""
        recipe = models.Recipe.objects.create(
            user=self.user,
            name='Some recipe name',
            time_minutes=720,
            description='Sample recipe description.'
        )

        self.assertEqual(str(recipe), recipe.name)
