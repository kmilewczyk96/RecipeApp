import uuid

from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from django.db import models

from core.utils.verification_service import VerificationService


class UserManager(BaseUserManager):
    """Custom User Manager model."""

    def create_user(self, email: str, password=None, **extra_fields):
        """Create, save and return a new user."""
        if not email:
            raise ValueError('User must have an email address.')

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)

        is_verified = extra_fields.get('is_verified', False)
        if not is_verified:
            verification_service = VerificationService(user)
            verification_service.set_verification_code()

        user.save(using=self._db)
        return user

    def create_superuser(self, email: str, password=None):
        """Create, save and return a new superuser."""
        su = self.create_user(
            email=email,
            password=password,
            is_staff=True,
            is_superuser=True,
            is_verified=True,
        )

        return su


class User(AbstractBaseUser, PermissionsMixin):
    """Custom User model."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    verification_code = models.CharField(max_length=6, blank=True, default="")
    verification_code_timestamp = models.DateTimeField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'


class Recipe(models.Model):
    """Recipe model."""
    CSV_SEPARATOR = "|"

    CUISINES = [
        ('american', 'American'),
        ('chinese', 'Chinese'),
        ('french', 'French'),
        ('greek', 'Greek'),
        ('indian', 'Indian'),
        ('italian', 'Italian'),
        ('japanese', 'Japanese'),
        ('lebanese', 'Lebanese'),
        ('mexican', 'Mexican'),
        ('thai', 'Thai'),
        ('turkish', 'Turkish'),
        ('vietnamese', 'Vietnamese'),
        ('other', 'Other'),
    ]
    TYPES = [
        ('cold_beverage', 'Cold beverage'),
        ('dessert', 'Dessert'),
        ('hot_beverage', 'Hot beverage'),
        ('main', 'Main'),
        ('snack', 'Snack'),
        ('soup', 'Soup'),
        ('other', 'Other'),
    ]

    objects: models.Manager

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    cuisine = models.CharField(max_length=32, choices=CUISINES, default='other', blank=False, null=False)
    recipe_type = models.CharField(max_length=32, choices=TYPES, default='other', blank=False, null=False)
    time_minutes = models.IntegerField()
    ingredients = models.ManyToManyField('Ingredient', through='RecipeIngredient')
    _steps = models.TextField(blank=False, null=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    @property
    def steps(self):
        """Retrieve steps from model's steps_csv field."""
        return self._steps.split(self.CSV_SEPARATOR)

    @steps.setter
    def steps(self, steps_list: list[str]):
        """Joins list of text values with csv separator and saves result as steps_csv field."""
        for step in steps_list:
            if not step.strip():
                raise ValueError('One of the steps is an empty string!')
            if self.CSV_SEPARATOR in step:
                raise ValueError('One of the steps contains CSV separator!')

        self._steps = self.CSV_SEPARATOR.join(steps_list)

    @property
    def tags(self):
        excluded_tags = self.r_ingredients.values_list('ingredient__excluded_tags', flat=True).distinct()
        excluded_tags = [tag for tag in excluded_tags if excluded_tags is not None]

        return Tag.objects.exclude(id__in=excluded_tags)

    @property
    def tag_names(self):
        tags = self.tags
        tag_names = tags.values_list('name', flat=True)

        return tag_names

    @property
    def kcal(self):
        r_ingredients_kcals = [ri.kcal for ri in self.r_ingredients.all()]
        return round(sum(r_ingredients_kcals), 1)

    def __str__(self):
        return self.name


class Tag(models.Model):
    """Tag model."""

    objects: models.Manager

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    """Ingredient model."""

    objects: models.Manager

    CATEGORIES = [
        ('bread', 'Bread'),
        ('eggs_and_dairy', 'Eggs & Dairy'),
        ('fats_and_oils', 'Fats & Oils'),
        ('fish', 'Fish'),
        ('fruit', 'Fruit'),
        ('grain', 'Grain'),
        ('herbs_spices', 'Herbs & Spices'),
        ('meat', 'Meat'),
        ('nuts', 'Nuts'),
        ('pasta_rice', 'Pasta & Rice'),
        ('vegetables', 'Vegetables'),
        ('others', 'Others'),
    ]
    UNITS = [
        ('g', 'gram'),
        ('ml', 'milliliter'),
    ]
    ALT_UNITS = [
        ('pc', 'piece'),
        ('tsp', 'teaspoon'),
        ('p', 'pinch'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    category = models.CharField(max_length=32, choices=CATEGORIES, default='others', blank=False, null=False)
    unit = models.CharField(max_length=8, choices=UNITS, default='g', blank=False, null=False)
    alt_unit = models.CharField(max_length=8, choices=ALT_UNITS, blank=True, null=False)
    alt_to_unit_conversion = models.PositiveIntegerField(blank=True, null=True)
    kcal_per_100_units = models.PositiveIntegerField()
    excluded_tags = models.ManyToManyField(Tag, blank=True)

    def clean(self):
        if self.alt_unit and self.alt_to_unit_conversion is None:
            raise ValidationError('Alt to unit conversion is missing! Remove alt unit or fill conversion rate field.')

        if self.alt_to_unit_conversion is not None and not self.alt_unit:
            raise ValidationError('Alt to unit conversion is provided but you forgot to fill alt unit field.')

        if self.alt_to_unit_conversion is not None and self.alt_to_unit_conversion <= 0:
            raise ValidationError('Alt to unit conversion must be greater than 0!')

    def save(self, *args, force_insert=False, force_update=False, using=None, update_fields=None):
        self.full_clean()
        super().save()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class RecipeIngredient(models.Model):
    """Recipe Ingredient model."""

    objects: models.Manager

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    recipe = models.ForeignKey(to=Recipe, on_delete=models.CASCADE, related_name='r_ingredients')
    ingredient = models.ForeignKey(to=Ingredient, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])

    def save(self, *args, force_insert=False, force_update=False, using=None, update_fields=None):
        self.full_clean()
        super().save()

    @property
    def kcal(self):
        return round(self.quantity * self.ingredient.kcal_per_100_units / 100, ndigits=1)

    def __str__(self):
        return f'{self.recipe}: {self.ingredient}.'

    class Meta:
        unique_together = ('recipe', 'ingredient')
