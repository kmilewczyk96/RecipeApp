from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import (
    Recipe,
    Tag,
)
from recipe.serializers import TagSerializer


TAGS_URL = reverse('recipe:tag-list')


def create_recipe(user, **params):
    DEFAULTS = {
        'user': user,
        'name': 'Some recipe',
        'time_minutes': 5,
        'description': 'Some description.'
    }
    DEFAULTS.update(params)
    recipe = Recipe.objects.create(**DEFAULTS)

    return recipe


class PrivateTagAPITests(TestCase):
    """Tests for authenticated Tag API requests."""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            email='user@example.com',
            password='Some_password123',
        )
        self.other_user = get_user_model().objects.create_user(
            email='other_user@example.com',
            password='Some_password123',
        )
        self.client.force_authenticate(user=self.user)

    def test_get_tag_list(self):
        """Tests if get request returns expected response."""
        Tag.objects.create(name='Vegan')
        Tag.objects.create(name='Gluten free')

        tags = Tag.objects.all().order_by('-name')
        serializer = TagSerializer(tags, many=True)

        res = self.client.get(TAGS_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)
