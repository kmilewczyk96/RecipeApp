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
        read_only_fields = ['id']


class RecipeSerializer(serializers.ModelSerializer):
    """Serializer for recipes."""
    tags = TagSerializer(many=True, required=False)

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'time_minutes', 'tags']
        read_only_fields = ['id']

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
