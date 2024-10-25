"""Serializers for recipe API."""
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.models import (
    Ingredient,
    Recipe,
    RecipeIngredient,
    Tag,
)
from user.serializers import UserStrictSerializer


class IngredientSerializer(serializers.ModelSerializer):
    """Serializer for Ingredients."""

    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'category', 'unit', 'alt_unit', 'alt_to_unit_conversion', 'kcal_per_100_units']
        read_only_fields = fields[1:]
        extra_kwargs = {
            'id': {'read_only': False}
        }


class RecipeIngredientSerializer(serializers.ModelSerializer):
    """Serializer for Recipe Ingredients."""
    ingredient = IngredientSerializer()

    class Meta:
        model = RecipeIngredient
        fields = ['id', 'ingredient', 'quantity']


class TagSerializer(serializers.ModelSerializer):
    """Serializer for Tags."""

    class Meta:
        model = Tag
        fields = ['id', 'name']
        read_only_fields = fields


class RecipeSerializer(serializers.ModelSerializer):
    """Serializer for Recipes."""
    user = UserStrictSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    r_ingredients = RecipeIngredientSerializer(many=True, required=True)

    class Meta:
        model = Recipe
        fields = ['id', 'user', 'name', 'time_minutes', 'tags', 'r_ingredients', 'created', 'modified']
        read_only_fields = ['id', 'user', 'tags', 'created', 'modified']

    def create(self, validated_data):
        r_ingredients = validated_data.pop('r_ingredients', [])
        recipe = Recipe.objects.create(**validated_data)

        if not r_ingredients:
            recipe.delete()
            raise ValidationError('Recipe must have at least one ingredient!')

        for ri in r_ingredients:
            ingredient_id = ri['ingredient']['id']
            ingredient = Ingredient.objects.get(id=ingredient_id)
            quantity = ri['quantity']
            RecipeIngredient.objects.create(
                recipe=recipe,
                ingredient=ingredient,
                quantity=quantity,
            )

        return recipe


class RecipeDetailSerializer(RecipeSerializer):
    """Serializer for Recipe details."""

    class Meta(RecipeSerializer.Meta):
        fields = RecipeSerializer.Meta.fields + ['description']
