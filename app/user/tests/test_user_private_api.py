from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient


ME_URL = reverse('user:me')


def create_user(**params):
    """Create and return a new user."""
    return get_user_model().objects.create_user(**params)


class UserPrivateAPITests(TestCase):
    """Test private features of the User API."""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(
            name='Test User',
            email='test@example.com',
            password='some_password123',
        )
        self.client.force_authenticate(user=self.user)

    def test_retrieve_profile(self):
        """Test if profile is retrieved successfully for logged-in User."""
        res = self.client.get(path=ME_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, {
            'name': self.user.name,
            'email': self.user.email,
        })

    def test_me_post_method_not_allowed(self):
        """Test if POST method for 'user:me' endpoint is not allowed."""
        res = self.client.post(path=ME_URL, data={})

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_user_profile(self):
        """Test if updating the User data if successful."""
        payload = {
            'name': 'My New Name',
            'password': 'updated_password123',
        }
        res = self.client.patch(path=ME_URL, data=payload)

        self.user.refresh_from_db()
        self.assertEqual(self.user.name, payload['name'])
        self.assertTrue(self.user.check_password(payload['password']))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
