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


class SmallIngredientSerializer(serializers.ModelSerializer):
    """Smaller version of Ingredient serializer for RecipeFormHelpers."""

    class Meta:
        model = Ingredient
        fields = ['name', 'unit', 'alt_unit', 'alt_to_unit_conversion']
        read_only_fields = fields


class RecipeIngredientSerializer(serializers.ModelSerializer):
    """Serializer for Recipe Ingredients."""
    ingredient = IngredientSerializer()
    kcal = serializers.FloatField(read_only=True)

    class Meta:
        model = RecipeIngredient
        fields = ['id', 'ingredient', 'kcal', 'quantity']


class TagSerializer(serializers.ModelSerializer):
    """Serializer for Tags."""

    class Meta:
        model = Tag
        fields = ['id', 'name']
        read_only_fields = fields


class RecipeSerializer(serializers.ModelSerializer):
    """Serializer for Recipes."""
    user = UserStrictSerializer(read_only=True)
    is_owner = serializers.SerializerMethodField('_is_owner')
    cuisine = serializers.ChoiceField(choices=Recipe.CUISINES, default=Recipe.CUISINES[-1])
    recipe_type = serializers.ChoiceField(choices=Recipe.TYPES, default=Recipe.TYPES[-1])
    tag_names = serializers.ListSerializer(child=serializers.CharField(), read_only=True)
    kcal = serializers.FloatField(read_only=True)

    def _is_owner(self, obj) -> bool:
        if self.context.get('request', None):
            request = self.context.get('request')
            return request.user.id == obj.user.id

        return False

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['cuisine'] = instance.get_cuisine_display()
        rep['recipe_type'] = instance.get_recipe_type_display()
        return rep

    class Meta:
        model = Recipe
        fields = ['id', 'user', 'is_owner', 'name', 'cuisine', 'recipe_type', 'time_minutes', 'tag_names', 'kcal', 'created', 'modified']
        read_only_fields = ['id', 'user', 'is_owner', 'tag_names', 'kcal', 'created', 'modified']


class RecipeDetailSerializer(RecipeSerializer):
    """Serializer for Recipe details."""
    r_ingredients = RecipeIngredientSerializer(many=True, required=True)
    steps = serializers.ListSerializer(child=serializers.CharField(), read_only=False)

    class Meta(RecipeSerializer.Meta):
        fields = RecipeSerializer.Meta.fields + ['r_ingredients', 'steps']

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


class RecipeFormHelperSerializer(serializers.Serializer):
    """Serializer for RecipeFormHelper."""
    cuisine_choices = serializers.DictField()
    type_choices = serializers.DictField()
    ingredients = serializers.DictField(child=SmallIngredientSerializer())
    csv_separator = serializers.CharField()

    class Meta:
        fields = ['cuisine_choices', 'type_choices', 'ingredients', 'csv_separator']
        read_only_fields = fields
