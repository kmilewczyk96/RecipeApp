from django.contrib.auth import get_user_model
from django.test import TestCase


class CustomUserTests(TestCase):
    """Test Custom User Model."""

    def test_create_user_with_email_successful(self):
        """Test if creating user with valid data succeeds."""
        email = 'test@example.com'
        password = 'password123'
        user = get_user_model().objects.create_user(
            email=email,
            password=password,
        )

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Test if email is normalized during registration."""
        sample_emails = (
            ('User1@example.com', 'User1@example.com'),
            ('user2@EXAMPLE.com', 'user2@example.com'),
            ('USER3@EXAMPLE.COM', 'USER3@example.com'),
            ('user4@example.COM', 'user4@example.com'),
        )

        for email, expected in sample_emails:
            user = get_user_model().objects.create_user(
                email=email,
                password='password123',
            )
            self.assertEqual(user.email, expected)

    def test_no_email_raises_error(self):
        """Test if not providing email would raise an error."""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(
                email='',
                password='password123'
            )

    def test_create_superuser(self):
        """Test if creating superuser with valid data succeeds."""
        su = get_user_model().objects.create_superuser(
            email='admin@example.com',
            password='password123',
        )
        self.assertTrue(su.is_staff)
        self.assertTrue(su.is_superuser)
