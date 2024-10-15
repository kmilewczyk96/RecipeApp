from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient


TAGS_URL = reverse('recipe:tag-list')


class TagPublicAPITests(TestCase):
    """Tests for unauthenticated Tag API requests."""

    def setUp(self):
        self.client = APIClient()

    def test_authentication_required(self):
        """Test if listing tags requires authentication."""
        res = self.client.get(TAGS_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
