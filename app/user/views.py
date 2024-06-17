"""
Views for the User API
"""
from rest_framework import generics

from user.serializers import UserSerializer


class CreateUserView(generics.CreateAPIView):
    """Create a new User in the database."""
    serializer_class = UserSerializer
