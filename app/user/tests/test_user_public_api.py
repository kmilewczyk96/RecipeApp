from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient


USER_URL = reverse('user:list-create')
TOKEN_URL = reverse('user:token')


def get_detail_url(user_ID):
    return reverse('user:details', args=[user_ID])


def create_verified_user(**params):
    """Create and return a new user."""
    return get_user_model().objects.create_user(**params, is_verified=True)


class UserPublicAPITests(TestCase):
    """Test public features of the User API."""

    def setUp(self):
        self.client = APIClient()

    def test_create_user_success(self):
        """Test if creating new User with valid payload is successful."""
        payload = {
            'email': 'user@example.com',
            'password': 'some_password123',
            'name': 'John Doe',
        }
        res = self.client.post(path=USER_URL, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(email=payload['email'])
        self.assertTrue(user.check_password(payload['password']))
        self.assertNotIn('password', res.data)

    def test_create_user_exists(self):
        """Test if attempting to duplicate email fails."""
        payload = {
            'email': 'test@example.com',
            'password': 'some_password123',
        }
        create_verified_user(**payload)
        res = self.client.post(path=USER_URL, data=payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_too_short(self):
        """Test if attempting to set too short password fails."""
        payload = {
            'email': 'test@example.com',
            'password': 'pass'
        }
        res = self.client.post(path=USER_URL, data=payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        user_exists = get_user_model().objects.filter(email=payload['email']).exists()
        self.assertFalse(user_exists)

    def test_create_token_for_user(self):
        """Test if token is generated upon providing valid credentials."""
        params = {
            'email': 'test@example.com',
            'password': 'some_password123',
        }
        create_verified_user(**params)

        payload = {
            'email': params['email'],
            'password': params['password'],
        }
        res = self.client.post(path=TOKEN_URL, data=payload)

        self.assertIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_deny_token_for_unverified_user(self):
        """Test if an error is thrown when trying to log in without prior email verification."""
        payload = {
            'email': 'unverified@example.com',
            'password': 'Password123',
        }

        get_user_model().objects.create_user(**payload)
        res = self.client.post(path=TOKEN_URL, data=payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_deny_token_for_user(self):
        """Test if an error is thrown upon providing invalid credentials."""
        params = {
            'email': 'test@example.com',
            'password': 'some_password123',
        }
        create_verified_user(**params)

        payload = {
            'email': params['email'],
            'password': 'different_password123',
        }
        res = self.client.post(path=TOKEN_URL, data=payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
