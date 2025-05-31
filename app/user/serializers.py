from django.contrib.auth import (
    authenticate,
    get_user_model,
)
from django.utils.translation import gettext as _

from rest_framework import serializers

from core.utils.verification_exceptions import EmailNotVerified


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User object."""
    passwordConfirmation = serializers.CharField(write_only=True)

    def validate(self, attrs: dict):
        if attrs.get('password') != attrs.pop('passwordConfirmation', None):
            raise ValueError('Password and password confirmation are not the same!')

        return attrs

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'password', 'passwordConfirmation', 'username']
        read_only_fields = ['id']
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 5},
        }

    def create(self, validated_data: dict):
        """Create and return a User with an encrypted password."""
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance: get_user_model(), validated_data: dict):
        """Update and return a User with an encrypted password."""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class UserStrictSerializer(serializers.ModelSerializer):
    """Serializer for showing base User info: ID and name."""

    class Meta:
        model = get_user_model()
        fields = ['id', 'username']
        read_only_fields = fields


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the User Auth Token."""

    email = serializers.EmailField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False,
    )

    def validate(self, attrs):
        """Validate and authenticate the User."""
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password,
        )
        if not user:
            msg = _('Unable to authenticate with provided credentials.')
            raise serializers.ValidationError(detail=msg, code='authorization')

        if not user.is_verified:
            raise EmailNotVerified(_('Please verify your email before logging in.'))

        attrs['user'] = user
        return attrs
