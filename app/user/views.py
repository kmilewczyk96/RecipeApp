"""
Views for the User API
"""
from django.contrib.auth import get_user_model

from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveAPIView,
    RetrieveUpdateDestroyAPIView
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from core.permissions import AuthenticatedOrPostOnly
from user import serializers


class UserView(ListCreateAPIView):
    """Basic view that allows retrieving Users when authenticated."""
    serializer_class = serializers.UserSerializer
    queryset = get_user_model().objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [AuthenticatedOrPostOnly]


class UserDetailView(RetrieveAPIView):
    """Basic view that allows check User details when authenticated."""
    serializer_class = serializers.UserSerializer
    queryset = get_user_model().objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # def get_object(self):
    #     serializer_ctx = self.get_serializer_context()
    #     userID = serializer_ctx['request']['userID']
    #     user = get_user_model().objects.get(id=userID)
    #     return user


class AuthUserDetailView(RetrieveUpdateDestroyAPIView):
    """Get currently authenticated User details."""
    serializer_class = serializers.UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """Retrieve currently authenticated User."""
        return self.request.user


class CreateTokenView(ObtainAuthToken):
    """Create a new Auth Token for User."""
    serializer_class = serializers.AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'userID': user.id
        })
