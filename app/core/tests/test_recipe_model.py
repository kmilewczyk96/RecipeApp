from django.contrib.auth import get_user_model
from django.test import TestCase

from core import models


def create_ingredient(**params):
    INGREDIENT = {
        'name': 'SomeIngredient',
        'kcal_per_100_units': 10,
    }
    INGREDIENT.update(**params)

    return models.Ingredient.objects.create(**INGREDIENT)


def create_recipe_ingredient(recipe, ingredient, **params):
    RECIPE_INGREDIENT = {
        'recipe': recipe,
        'ingredient': ingredient,
        'quantity': 1,
    }
    RECIPE_INGREDIENT.update(**params)

    return models.RecipeIngredient.objects.create(**RECIPE_INGREDIENT)


def create_tag(**params):
    TAG = {
        'name': 'SomeTag',
    }
    TAG.update(**params)

    return models.Tag.objects.create(**TAG)


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

    def test_create_complex_recipe(self):
        """Test if creating complex recipe with valid data is successful."""
        ingredients = [create_ingredient(name=name) for name in ('butter', 'salt', 'bread')]
        recipe = models.Recipe.objects.create(
            user=self.user,
            name='Some recipe',
            time_minutes=60,
            description='Some description.',
        )
        recipe_ingredients = [create_recipe_ingredient(
            recipe=recipe,
            ingredient=ingredient,
            quantity=10,
        ) for ingredient in ingredients]

        self.assertEqual(len(recipe_ingredients), len(recipe.recipeingredient_set.all()))
        self.assertEqual(len(models.Recipe.objects.all()), 1)
