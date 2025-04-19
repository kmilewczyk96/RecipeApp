from ..exceptions import APIError


class VerificationError(APIError):
    """Base exception for verification-related errors."""
    pass


class VerificationCodeExpired(VerificationError):
    """Raised when verification code has expired."""
    pass


class VerificationCodeInvalid(VerificationError):
    """Raised when verification code doesn't match."""
    pass


class VerificationCodeMissing(VerificationError):
    """Raised when verification code doesn't exist."""
    pass
