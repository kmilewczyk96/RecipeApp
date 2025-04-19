class APIError(Exception):
    """Base exception for all API-related errors."""
    pass


class RateLimitExceeded(APIError):
    """Raised when the rate limit is exceeded."""
    pass
