from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient


TOKEN_URL = reverse('user:token')
GENERIC_PASSWORD = 'some_password123'


def create_user(is_verified: bool) -> get_user_model():
    """Create and return a new user."""
    return get_user_model().objects.create_user(
        email='user@example.com',
        password=GENERIC_PASSWORD,
        username='User',
        is_verified=is_verified,
    )


class LoggingInAPITests(TestCase):
    """Tests of API endpoint(s) responsible for logging in (obtaining the Auth Token)."""

    def setUp(self):
        self.client: APIClient = APIClient()

    def test_login_successful(self):
        """Test if a token is generated on login for a verified User."""
        user = create_user(is_verified=True)

        payload = {
            'email': user.email,
            'password': GENERIC_PASSWORD,
            'passwordConfirmation': GENERIC_PASSWORD,
        }

        res = self.client.post(path=TOKEN_URL, data=payload)

        self.assertIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_login_with_invalid_credentials(self):
        """Test if attempting to log in with wrong credentials fails."""
        user = create_user(is_verified=True)

        password = GENERIC_PASSWORD + "123"
        payload = {
            'email': user.email,
            'password': password,
            'passwordConfirmation': password,
        }

        res = self.client.post(path=TOKEN_URL, data=payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_with_unverified_email(self):
        """Test if attempting to log in with an unverified email fails."""
        user = create_user(is_verified=False)

        payload = {
            'email': user.email,
            'password': GENERIC_PASSWORD,
            'passwordConfirmation': GENERIC_PASSWORD,
        }

        res = self.client.post(path=TOKEN_URL, data=payload)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
