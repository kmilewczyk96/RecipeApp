from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """Custom permission that prevents non-owners from manipulating objects."""

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.id == obj.id


class AuthenticatedOrPostOnly(permissions.BasePermission):
    """Custom permission that only allows POST method when not authenticated (for registration)."""

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True

        return request.user and request.user.is_authenticated
