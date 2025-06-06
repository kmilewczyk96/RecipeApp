# Generated by Django 5.2 on 2025-04-15 17:58

import django.core.validators
import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, unique=True)),
                ('category', models.CharField(choices=[('bread', 'Bread'), ('eggs_and_dairy', 'Eggs & Dairy'), ('fats_and_oils', 'Fats & Oils'), ('fish', 'Fish'), ('fruit', 'Fruit'), ('grain', 'Grain'), ('herbs_spices', 'Herbs & Spices'), ('meat', 'Meat'), ('nuts', 'Nuts'), ('pasta_rice', 'Pasta & Rice'), ('vegetables', 'Vegetables'), ('others', 'Others')], default='others', max_length=32)),
                ('unit', models.CharField(choices=[('g', 'gram'), ('ml', 'milliliter')], default='g', max_length=8)),
                ('alt_unit', models.CharField(blank=True, choices=[('pc', 'piece'), ('tsp', 'teaspoon'), ('p', 'pinch')], max_length=8)),
                ('alt_to_unit_conversion', models.PositiveIntegerField(blank=True, null=True)),
                ('kcal_per_100_units', models.PositiveIntegerField()),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('name', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('cuisine', models.CharField(choices=[('american', 'American'), ('chinese', 'Chinese'), ('french', 'French'), ('greek', 'Greek'), ('indian', 'Indian'), ('italian', 'Italian'), ('japanese', 'Japanese'), ('lebanese', 'Lebanese'), ('mexican', 'Mexican'), ('thai', 'Thai'), ('turkish', 'Turkish'), ('vietnamese', 'Vietnamese'), ('other', 'Other')], default='other', max_length=32)),
                ('recipe_type', models.CharField(choices=[('cold_beverage', 'Cold beverage'), ('dessert', 'Dessert'), ('hot_beverage', 'Hot beverage'), ('main', 'Main'), ('snack', 'Snack'), ('soup', 'Soup'), ('other', 'Other')], default='other', max_length=32)),
                ('time_minutes', models.IntegerField()),
                ('_steps', models.TextField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RecipeIngredient',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('quantity', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('ingredient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.ingredient')),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='r_ingredients', to='core.recipe')),
            ],
            options={
                'unique_together': {('recipe', 'ingredient')},
            },
        ),
        migrations.AddField(
            model_name='recipe',
            name='ingredients',
            field=models.ManyToManyField(through='core.RecipeIngredient', to='core.ingredient'),
        ),
        migrations.AddField(
            model_name='ingredient',
            name='excluded_tags',
            field=models.ManyToManyField(blank=True, to='core.tag'),
        ),
    ]
