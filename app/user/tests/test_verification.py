from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.utils.verification_service import VerificationService


USER_VERIFY_EMAIL = reverse('user:verify-email')
GENERIC_PASSWORD = 'some_password123'


def create_user(is_verified: bool) -> get_user_model():
    """Create and return a new user."""
    return get_user_model().objects.create_user(
        email='user@example.com',
        password=GENERIC_PASSWORD,
        username='User',
        is_verified=is_verified,
    )


class VerificationAPITests(TestCase):
    """Tests of Verification Service."""

    def setUp(self):
        self.client: APIClient = APIClient()
        self.user = create_user(is_verified=False)

    def test_verify_user_email_rate_limit(self):
        """User should have a limited number of tries to prevent brute force validation."""
        for _ in range(VerificationService.REQUEST_LIMIT + 1):
            res = self.client.post(USER_VERIFY_EMAIL, data={
                'email': self.user.email,
                'password': GENERIC_PASSWORD,
                'verification_code': 'xxxxxx',
            })

        self.assertEqual(res.status_code, status.HTTP_429_TOO_MANY_REQUESTS)

    def test_verify_user_email_successful(self):
        """
        Test if providing valid credentials with the correct 6-digit code verifies User and returns them auth-token.
        """
        self.assertFalse(self.user.is_verified)

        res = self.client.post(USER_VERIFY_EMAIL, data={
            'email': self.user.email,
            'password': GENERIC_PASSWORD,
            'verification_code': self.user.verification_code,
        })
        self.user.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn(member='token', container=res.data)
        self.assertTrue(self.user.is_verified)
