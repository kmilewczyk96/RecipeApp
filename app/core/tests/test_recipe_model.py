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


def create_recipe_ingredient(recipe: models.Recipe, ingredient: models.Ingredient,
                             **params: dict) -> models.RecipeIngredient:
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
            username='TestUser',
            email='test@example.com',
            password='some_password123'
        )

    def test_create_recipe_success(self):
        """Test if creating a valid recipe is successful."""
        recipe = models.Recipe.objects.create(
            user=self.user,
            name='Some recipe name',
            time_minutes=720,
        )

        self.assertEqual(str(recipe), recipe.name)
        self.assertEqual(recipe.recipe_type, 'other')
        self.assertEqual(recipe.cuisine, 'other')

    def test_create_complex_recipe(self):
        """Test if creating complex recipe with valid data is successful."""
        ingredients = [create_ingredient(name=name) for name in ('butter', 'salt', 'bread')]
        recipe = models.Recipe.objects.create(
            user=self.user,
            name='Some recipe',
            cuisine='european',
            recipe_type='cold_beverage',
            time_minutes=60,
        )
        recipe_ingredients = [create_recipe_ingredient(
            recipe=recipe,
            ingredient=ingredient,
            quantity=10,
        ) for ingredient in ingredients]

        self.assertEqual(len(recipe_ingredients), len(recipe.r_ingredients.all()))
        self.assertEqual(len(models.Recipe.objects.all()), 1)

    def test_auto_create_tags(self):
        """Test if Tags are assigned automatically based on Recipe Ingredient's excluded Tags."""
        tags = [create_tag(name=name) for name in ('vegan', 'vegetarian', 'seafood free')]
        ingredient1 = create_ingredient(name='egg')
        ingredient1.excluded_tags.add(tags[0])
        ingredient2 = create_ingredient(name='some_meat')
        ingredient2.excluded_tags.add(tags[0], tags[1])

        recipe = models.Recipe.objects.create(
            user=self.user,
            name='SomeRecipe',
            time_minutes=20,
        )

        self.assertEqual(len(recipe.tags), 3)

        create_recipe_ingredient(
            recipe=recipe,
            ingredient=ingredient1,
        )
        create_recipe_ingredient(
            recipe=recipe,
            ingredient=ingredient2,
        )

        self.assertEqual(len(recipe.tags), 1)
        self.assertEqual(recipe.tags[0], tags[2])
