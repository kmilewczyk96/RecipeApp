"""
Views for the User API
"""
from django.contrib.auth import get_user_model

from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.viewsets import ModelViewSet

from core.permissions import IsOwnerOrReadOnly
from user import serializers


class UserViewSet(ModelViewSet):
    serializer_class = serializers.UserSerializer
    queryset = get_user_model().objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsOwnerOrReadOnly]


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
