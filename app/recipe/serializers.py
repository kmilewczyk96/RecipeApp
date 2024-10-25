"""Serializers for recipe API."""
from rest_framework import serializers

from core.models import (
    Recipe,
    Tag,
)
from user.serializers import UserStrictSerializer


class TagSerializer(serializers.ModelSerializer):
    """Serializer for tags."""

    class Meta:
        model = Tag
        fields = ['id', 'name']
        extra_kwargs = {
            'id': {
                'read_only': True,
            }
        }


class NestedTagSerializer(TagSerializer):
    """Serializer for nested tags."""

    class Meta(TagSerializer.Meta):
        extra_kwargs = {
            'id': {
                'read_only': False,
            },
            'name': {
                'validators': [],
                'required': False,
            },
        }


class RecipeSerializer(serializers.ModelSerializer):
    """Serializer for recipes."""
    user = UserStrictSerializer(read_only=True)

    class Meta:
        model = Recipe
        fields = ['id', 'user', 'name', 'time_minutes', 'created', 'modified']
        read_only_fields = ['id', 'user', 'created', 'modified']


class RecipeDetailSerializer(RecipeSerializer):
    """Serializer for recipe details."""

    class Meta(RecipeSerializer.Meta):
        fields = RecipeSerializer.Meta.fields + ['description']
