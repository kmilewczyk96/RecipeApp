from django.contrib.auth import get_user_model
from django.test import (
    Client,
    TestCase
)
from django.urls import reverse


class AdminPanelTests(TestCase):
    """Tests for built-in Django Admin Panel."""

    def setUp(self):
        """Prepare environment for each test."""
        self.client = Client()
        self.su = get_user_model().objects.create_superuser(
            email='admin@example.com',
            password='password123',
        )
        self.client.force_login(user=self.su)
        self.user = get_user_model().objects.create_user(
            email='user1@example.com',
            password='password123',
            username='BaseUser001'
        )

    def test_users_list(self):
        """Test if users are listed on page."""
        url = reverse('admin:core_user_changelist')
        res = self.client.get(url)

        self.assertContains(res, self.user.email),
        self.assertContains(res, self.user.username)

    def test_edit_user_panel(self):
        """Test if Users can be edited."""
        url = reverse('admin:core_user_change', args=[self.user.id])
        res = self.client.get(url)

        self.assertEqual(res.status_code, 200)

    def test_create_user_panel(self):
        """Test if Users can be created."""
        url = reverse('admin:core_user_add')
        res = self.client.get(url)

        self.assertEqual(res.status_code, 200)
