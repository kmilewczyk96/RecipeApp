from django.core.exceptions import ValidationError
from django.db import transaction
from django.test import TestCase

from core.models import (
    Ingredient,
    Tag,
)


def create_ingredient(**payload):
    """Utility function to create base Ingredient in the database."""
    INGREDIENT = {
        'name': 'Ingredient',
        'category': 'bread',
        'unit': 'g',
        'kcal_per_100_units': 2000,
    }
    INGREDIENT.update(**payload)

    return Ingredient.objects.create(**INGREDIENT)


class IngredientModelTests(TestCase):
    """Tests for Ingredient model."""

    def test_create_ingredient(self):
        """Test if creating basic Ingredient is successful."""
        ingredient = create_ingredient()
        queryset = Ingredient.objects.all()

        self.assertEqual(len(queryset), 1)
        self.assertEqual(str(queryset[0]), ingredient.name)

    def test_default_values(self):
        """Test if default Ingredient values are correct."""
        ingredient = Ingredient.objects.create(
            name='Potato',
            kcal_per_100_units=100,
        )

        self.assertEqual(ingredient.category, 'others')
        self.assertEqual(ingredient.unit, 'g')

    def test_create_complex_ingredient(self):
        """Test if creating complex Ingredient is successful."""
        tag1 = Tag.objects.create(name='vegan')
        tag2 = Tag.objects.create(name='gluten free')
        tag3 = Tag.objects.create(name='lactose free')

        ingredient = create_ingredient(
            alt_unit='spoon',
            alt_to_unit_conversion=20,
        )
        ingredient.excluded_tags.add(tag1, tag2)
        ingredient.refresh_from_db()

        self.assertEqual(ingredient.alt_unit, 'spoon')
        self.assertEqual(ingredient.alt_to_unit_conversion, 20)
        self.assertIn(tag1, ingredient.excluded_tags.all())
        self.assertIn(tag2, ingredient.excluded_tags.all())
        self.assertNotIn(tag3, ingredient.excluded_tags.all())

    def test_create_with_zero_calories(self):
        """Test if creating Ingredient with no calories is successful."""
        ingredient = create_ingredient(
            name='Water',
            kcal_per_100_units=0,
        )

        self.assertIn(ingredient, Ingredient.objects.all())

    def test_negative_values_not_allowed(self):
        """Test if attempting to create Ingredient with negative values fails."""
        with self.assertRaises(ValidationError):
            with transaction.atomic():
                create_ingredient(
                    alt_to_unit_conversion=-1
                )

        with self.assertRaises(ValidationError):
            with transaction.atomic():
                create_ingredient(
                    kcal_per_100_units=-5
                )

    def test_alt_to_unit_conversion_check(self):
        """Test if attempting to create or update Ingredient with alt unit and no conversion value fails."""
        with self.assertRaises(ValidationError):
            with transaction.atomic():
                create_ingredient(
                    alt_unit='pinch'
                )

        with self.assertRaises(ValidationError):
            with transaction.atomic():
                ingredient = create_ingredient(
                    alt_unit='pinch',
                    alt_to_unit_conversion=50,
                )
                ingredient.alt_to_unit_conversion = None
                ingredient.save()

        with self.assertRaises(ValidationError):
            with transaction.atomic():
                create_ingredient(
                    alt_unit='pinch',
                    alt_to_unit_conversion=0,
                )
