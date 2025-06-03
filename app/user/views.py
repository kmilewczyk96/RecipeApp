"""
Views for the User API
"""
from django.contrib.auth import get_user_model

from rest_framework import status
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
from rest_framework.views import APIView

from core.exceptions import RateLimitExceeded
from core.permissions import AuthenticatedOrPostOnly
from core.utils.verification_exceptions import (
    VerificationCodeExpired,
    VerificationCodeInvalid,
    VerificationCodeMissing,
)
from core.utils.verification_service import VerificationService
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


class VerifyUserView(APIView):
    """Verifies User if provided correct credentials."""
    def post(self, request):
        try:
            vs = VerificationService(request.user)
            vs.check_rate_limit()
            vs.check_verification_code(request.data.get('verification_code'))
        except (VerificationCodeExpired, VerificationCodeInvalid, VerificationCodeMissing) as error:
            return Response(
                data={'msg': str(error)},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except RateLimitExceeded as error:
            return Response(
                data={'msg': str(error)},
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )

        return Response(
            data={'msg': 'Verification successful.'},
            status=status.HTTP_200_OK
        )
