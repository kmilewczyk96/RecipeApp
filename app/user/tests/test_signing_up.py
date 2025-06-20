from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from rest_framework.test import APIClient


SIGNUP_URL = reverse('user:list-create')
GENERIC_PASSWORD = 'some_password123'


def create_user(is_verified: bool) -> get_user_model():
    """Create and return a new user."""
    return get_user_model().objects.create_user(
        email='user@example.com',
        password=GENERIC_PASSWORD,
        username='User',
        is_verified=is_verified,
    )


class SigningUpAPITests(TestCase):
    """Tests of API Endpoint(s) responsible for signing up."""

    def setUp(self):
        self.client: APIClient = APIClient()

    def test_signup_successful(self):
        """Test if a new, unverified User is created."""
        payload = {
            'email': 'user@example.com',
            'username': 'user',
            'password': GENERIC_PASSWORD,
            'passwordConfirmation': GENERIC_PASSWORD,
        }

        res = self.client.post(path=SIGNUP_URL, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        user = get_user_model().objects.get(email=payload['email'])
        self.assertFalse(user.is_verified)

    def test_signup_with_registered_email(self):
        """Test if an attempt to create a new User with registered email fails."""
        user = create_user(is_verified=False)

        payload = {
            'email': user.email,
            'username': user.username + '123',
            'password': GENERIC_PASSWORD,
            'passwordConfirmation': GENERIC_PASSWORD,
        }

        res = self.client.post(path=SIGNUP_URL, data=payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
