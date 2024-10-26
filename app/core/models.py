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


class UserManager(BaseUserManager):
    """Custom User Manager model."""

    def create_user(self, email: str, password=None, **extra_fields):
        """Create, save and return a new user."""
        if not email:
            raise ValueError('User must have an email address.')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email: str, password=None):
        """Create, save and return a new superuser."""
        su = self.create_user(
            email=email,
            password=password,
            is_staff=True,
            is_superuser=True,
        )

        return su


class User(AbstractBaseUser, PermissionsMixin):
    """Custom User model."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'


class Recipe(models.Model):
    """Recipe model."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    time_minutes = models.IntegerField()
    description = models.TextField(blank=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    @property
    def tags(self):
        excluded_tags = self.r_ingredients.values_list('ingredient__excluded_tags', flat=True)
        return Tag.objects.exclude(id__in=excluded_tags)

    @property
    def kcal(self):
        r_ingredients = self.r_ingredients.values_list('quantity', 'ingredient__kcal_per_100_units')
        return round(sum((quantity * kcal_per_100 for quantity, kcal_per_100 in r_ingredients)) / 100, ndigits=1)

    def __str__(self):
        return self.name


class Tag(models.Model):
    """Tag model."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    """Ingredient model."""
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
        ('g', 'grams'),
        ('ml', 'millilitres'),
    ]
    ALT_UNITS = [
        ('piece', 'pieces'),
        ('spoon', 'spoons'),
        ('pinch', 'pinches'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    category = models.CharField(max_length=32, choices=CATEGORIES, default='others', blank=False, null=False)
    unit = models.CharField(max_length=8, choices=UNITS, default='g', blank=False, null=False)
    alt_unit = models.CharField(max_length=8, choices=ALT_UNITS, blank=True, null=True)
    alt_to_unit_conversion = models.PositiveIntegerField(blank=True, null=True)
    kcal_per_100_units = models.PositiveIntegerField()
    excluded_tags = models.ManyToManyField(Tag, blank=True)

    def clean(self):
        if self.alt_unit is not None and self.alt_to_unit_conversion is None:
            raise ValidationError('Alt to unit conversion is missing! Remove alt unit or fill conversion rate field.')

        if self.alt_to_unit_conversion is not None and self.alt_unit is None:
            raise ValidationError('Alt to unit conversion is provided but you forgot to fill alt unit field.')

        if self.alt_to_unit_conversion is not None and self.alt_to_unit_conversion <= 0:
            raise ValidationError('Alt to unit conversion must be greater than 0!')

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.full_clean()
        super().save()

    def __str__(self):
        return self.name


class RecipeIngredient(models.Model):
    """Recipe Ingredient model."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    recipe = models.ForeignKey(to=Recipe, on_delete=models.CASCADE, related_name='r_ingredients')
    ingredient = models.ForeignKey(to=Ingredient, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.full_clean()
        super().save()

    def __str__(self):
        return f'{self.recipe}: {self.ingredient}.'

    class Meta:
        unique_together = ('recipe', 'ingredient')
