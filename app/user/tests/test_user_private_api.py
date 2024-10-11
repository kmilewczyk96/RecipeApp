from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient


USER_URL = reverse('user:user-list')


def get_detail_url(user_ID):
    return reverse('user:user-detail', args=[user_ID])


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

    def test_update_user_profile(self):
        """Test if updating the User data if successful."""
        payload = {
            'name': 'My New Name',
            'password': 'updated_password123',
        }
        url = get_detail_url(self.user.id)
        res = self.client.patch(path=url, data=payload)

        self.user.refresh_from_db()
        self.assertEqual(self.user.name, payload['name'])
        self.assertTrue(self.user.check_password(payload['password']))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_view_other_user_profile(self):
        """Test if Users can view each other profiles."""
        other_user = create_user(email='other_user@example.com', password='SomePassword123')
        url = get_detail_url(other_user.id)
        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_other_user_read_only(self):
        """Test if only safe methods can be performed on other profiles."""
        other_user = create_user(email='other_user@example.com', password='SomePassword123')
        url = get_detail_url(other_user.id)
        payload = {
            'email': 'other_email@example.com',
            'name': 'Some name',
            'password': 'SomeNewPassword123'
        }
        responses = [
            self.client.patch(url, payload),
            self.client.put(url, payload),
            self.client.delete(url)
        ]
        for res in responses:
            self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_non_safe_methods_on_self(self):
        """User can modify his profile or delete it permanently."""
        url = get_detail_url(self.user.id)
        payload = {
            'email': 'other_email@example.com',
            'name': 'Some name',
            'password': 'SomeNewPassword123'
        }
        responses = [
            self.client.patch(url, payload),
            self.client.put(url, payload),
        ]
        for res in responses:
            self.assertEqual(res.status_code, status.HTTP_200_OK)

        del_res = self.client.delete(url)
        self.assertEqual(del_res.status_code, status.HTTP_204_NO_CONTENT)
