"""Serializers for recipe API."""
from django.http import Http404

from rest_framework import serializers

from core.models import (
    Recipe,
    Tag,
)


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
        read_only_fields = []
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
    tags = NestedTagSerializer(many=True, required=False)

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'time_minutes', 'tags', 'created', 'modified']
        read_only_fields = ['id', 'created', 'modified']

    def create(self, validated_data):
        """Create a Recipe."""
        tags = validated_data.pop('tags', [])
        recipe = Recipe.objects.create(**validated_data)

        tag_objects = []
        for tag in tags:
            try:
                objs = Tag.objects.get(**tag)
                tag_objects.append(objs)
            except Tag.DoesNotExist:
                raise Http404('Tag does not exist!')

        for tag_obj in tag_objects:
            recipe.tags.add(tag_obj)

        return recipe


class RecipeDetailSerializer(RecipeSerializer):
    """Serializer for recipe details."""

    class Meta(RecipeSerializer.Meta):
        fields = RecipeSerializer.Meta.fields + ['description']
