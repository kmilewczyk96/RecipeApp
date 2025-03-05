import random

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.management.base import BaseCommand
from faker import Faker
from faker_food import FoodProvider


from core.models import (
    Ingredient,
    Recipe,
    RecipeIngredient,
    Tag,
)


class Command(BaseCommand):
    """Django command that populates Database with fake data for showcase purposes."""
    FAKE_USER_COUNT = 30

    @staticmethod
    def _create_ingredients():
        """Creates a lot of fake ingredients."""
        for i in range(60):
            Ingredient.objects.get_or_create(
                name=f'ingredient_{i + 1}',
                category=random.choice(Ingredient.CATEGORIES)[0],
                unit=random.choice(Ingredient.UNITS)[0],
                kcal_per_100_units=random.randint(0, 1500),
            )

    @staticmethod
    def _create_recipe_ingredients():
        """Creates a couple of fake Recipe Ingredients for fake recipes."""
        fake_users = get_user_model().objects.filter(email__contains='fake_user')
        fake_recipes = Recipe.objects.filter(user__in=fake_users)
        ingredients = Ingredient.objects.all()

        for recipe in fake_recipes:
            ingredients_count = random.randint(4, 12)
            for _ in range(ingredients_count):
                try:
                    RecipeIngredient.objects.create(
                        recipe=recipe,
                        ingredient=random.choice(ingredients),
                        quantity=random.randint(5, 50),
                    )
                except ValidationError:
                    pass

    @staticmethod
    def _create_recipes():
        """Creates a lot of fake recipes."""
        fake = Faker()
        fake.add_provider(FoodProvider)

        users = get_user_model().objects.filter(email__contains='fake_user')
        for user in users:
            Recipe.objects.create(
                user=user,
                name=fake.dish(),
                time_minutes=random.randint(5, 120),
                _steps=Recipe.CSV_SEPARATOR.join([fake.sentence(10) for _ in range(random.randint(3, 12))])
            )

    @staticmethod
    def _create_tags():
        """Creates tags."""
        Tag.objects.get_or_create(
            name='vegan',
        )
        Tag.objects.get_or_create(
            name='vegetarian',
        )
        Tag.objects.get_or_create(
            name='gluten free',
        )

    def _create_users(self):
        """Creates fake users."""
        fake = Faker()

        for i in range(self.FAKE_USER_COUNT):
            get_user_model().objects.create_user(
                email=f'fake_user{i + 1}@example.com',
                password=fake.password(12),
                name=fake.name(),
            )

    def handle(self, *args, **options):
        """Entrypoint for command."""
        if get_user_model().objects.filter(email__contains='fake_user').exists():
            self.stdout.write('Skipping populating database...')
            return

        self.stdout.write('Attempting to inject fake data...')

        self.stdout.write('Creating users...')
        self._create_users()

        self.stdout.write('Creating tags...')
        self._create_tags()

        self.stdout.write('Creating ingredients...')
        self._create_ingredients()

        self.stdout.write('Creating recipes...')
        self._create_recipes()

        self.stdout.write('Creating recipes ingredients...')
        self._create_recipe_ingredients()
