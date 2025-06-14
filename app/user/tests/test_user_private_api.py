from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.utils.verification_service import VerificationService


USER_ME = reverse('user:me')
USER_URL = reverse('user:list-create')
USER_VERIFY = reverse('user:verify-user')


def get_detail_url(user_ID):
    return reverse('user:details', args=[user_ID])


def create_user(**params):
    """Create and return a new user."""
    return get_user_model().objects.create_user(**params)


class UserPrivateAPITests(TestCase):
    """Test private features of the User API."""

    def setUp(self):
        self.client: APIClient = APIClient()
        self.user = create_user(
            username='Test User',
            email='test@example.com',
            password='some_password123',
        )
        self.client.force_authenticate(user=self.user)

    def test_update_user_profile(self):
        """Test if updating the User data if successful."""
        payload = {
            'username': 'My New Name',
            'password': 'updated_password123',
            'passwordConfirmation': 'updated_password123',
        }
        res = self.client.patch(path=USER_ME, data=payload)

        self.user.refresh_from_db()
        self.assertEqual(self.user.username, payload['username'])
        self.assertTrue(self.user.check_password(payload['password']))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_view_other_user_profile(self):
        """Test if Users can view each other profiles."""
        other_user = create_user(email='other_user@example.com', password='SomePassword123')
        url = get_detail_url(other_user.id)
        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_non_safe_methods_on_self(self):
        """User can modify his profile or delete it permanently."""
        payload = {
            'email': 'other_email@example.com',
            'username': 'Some name',
            'password': 'SomeNewPassword123',
            'passwordConfirmation': 'SomeNewPassword123',
        }
        responses = [
            self.client.patch(USER_ME, payload),
            self.client.put(USER_ME, payload),
        ]
        for res in responses:
            self.assertEqual(res.status_code, status.HTTP_200_OK)

        del_res = self.client.delete(USER_ME)
        self.assertEqual(del_res.status_code, status.HTTP_204_NO_CONTENT)

    def test_verify_user_email(self):
        """User can verify his email."""
        verification_code = self.user.verification_code
        self.assertFalse(self.user.is_verified)

        self.client.post(USER_VERIFY, data={
            'verification_code': verification_code,
        })
        self.user.refresh_from_db()
        self.assertTrue(self.user.is_verified)

    def test_verify_user_email_rate_limit(self):
        """User should have a limited number of tries to prevent brute force validation."""
        verification_code = self.user.verification_code
        request_limit = VerificationService.REQUEST_LIMIT

        for _ in range(request_limit + 1):
            res = self.client.post(USER_VERIFY, data={
                'verification_code': verification_code[1:]
            })

        self.assertEqual(res.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
