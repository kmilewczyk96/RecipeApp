from datetime import timedelta
from random import randint

from django.core.cache import cache
from django.utils import timezone

from .verification_exceptions import (
    VerificationCodeExpired,
    VerificationCodeInvalid,
    VerificationCodeMissing,
)
from ..exceptions import RateLimitExceeded


class VerificationService:
    """Handles creating, resetting and checking of 6-digit OTP."""
    CODE_EXPIRATION_MINUTES = 30
    REQUEST_LIMIT = 5

    def __init__(self, user):
        self.user = user

    def set_verification_code(self) -> None:
        """Sets verification code for the User."""
        self.user.verification_code = str(randint(0, 999999)).zfill(6)
        self.user.verification_code_timestamp = timezone.now()
        self.user.save(update_fields=['verification_code', 'verification_code_timestamp'])

    def clear_verification_code(self) -> None:
        """Clears verification code of the User."""
        self.user.verification_code = ''
        self.user.verification_code_timestamp = None
        self.user.save(update_fields=['verification_code', 'verification_code_timestamp'])

    def check_verification_code(self, code: str) -> None:
        """Checks if provided code matches verification code and returns a boolean value."""
        if not self.user.verification_code or not self.user.verification_code_timestamp:
            raise VerificationCodeMissing('Verification code is missing for this User.')

        if timezone.now() > (self.user.verification_code_timestamp + timedelta(minutes=self.CODE_EXPIRATION_MINUTES)):
            self.clear_verification_code()
            raise VerificationCodeExpired('Verification code has expired.')

        is_valid = self.user.verification_code == code
        if is_valid:
            self.clear_verification_code()
            self.user.is_verified = True
            self.user.save(update_fields=['is_verified'])
            return None

        raise VerificationCodeInvalid

    def check_rate_limit(self) -> None:
        """Checks if the request rate limit was not exceeded."""
        cache_key = f'verification_attempts_of_{self.user.id}'
        attempts = cache.get(cache_key, 0)

        if attempts >= 5:
            raise RateLimitExceeded('Too many requests, please try again later.')

        cache.set(cache_key, attempts + 1, timeout=1800)
