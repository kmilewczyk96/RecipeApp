from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import transaction
from django.test import TestCase

from core.models import (
    Ingredient,
    Recipe,
    RecipeIngredient,
)


def create_ingredient(**params):
    INGREDIENT = {
        'name': 'Some Ingredient',
        'category': 'others',
        'unit': 'ml',
        'kcal_per_100_units': 1000,
    }
    INGREDIENT.update(**params)

    return Ingredient.objects.create(**INGREDIENT)


def create_recipe(**params):
    user = get_user_model().objects.create_user(
        email='test@example.com',
        password='SomePassword123',
    )
    RECIPE = {
        'user': user,
        'name': 'Some Recipe',
        'time_minutes': 20,
    }
    RECIPE.update(**params)

    return Recipe.objects.create(**RECIPE)


class RecipeIngredientTests(TestCase):
    """Tests for Recipe Ingredient model."""

    def test_create_recipe_ingredient(self):
        """Test if creating Recipe Ingredient with valid data is successful."""
        ri = RecipeIngredient.objects.create(
            recipe=create_recipe(),
            ingredient=create_ingredient(),
            quantity=1,
        )

        qs = RecipeIngredient.objects.all()

        self.assertEqual(len(qs), 1)
        self.assertIn(ri, qs)

    def test_recipe_ingredient_unique_together(self):
        """Test if attempting to add same Ingredient to the same Recipe fails."""
        recipe = create_recipe()
        ingredient = create_ingredient()

        with self.assertRaises(ValidationError):
            RecipeIngredient.objects.create(
                recipe=recipe,
                ingredient=ingredient,
                quantity=1
            )
            RecipeIngredient.objects.create(
                recipe=recipe,
                ingredient=ingredient,
                quantity=2,
            )

    def test_quantity_less_or_equal_zero(self):
        """Test if attempting to add Ingredient with invalid quantity fails."""
        recipe = create_recipe()
        ingredient = create_ingredient()

        with self.assertRaises(ValidationError):
            with transaction.atomic():
                RecipeIngredient.objects.create(
                    recipe=recipe,
                    ingredient=ingredient,
                    quantity=0,
                )

        with self.assertRaises(ValidationError):
            with transaction.atomic():
                RecipeIngredient.objects.create(
                    recipe=recipe,
                    ingredient=ingredient,
                    quantity=-1
                )
