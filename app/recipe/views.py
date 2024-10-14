"""Views for Recipe API."""
from drf_spectacular.utils import (
    extend_schema,
    extend_schema_view,
    OpenApiParameter,
    OpenApiTypes,
)

from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Recipe
from core.permissions import IsOwnerOrReadOnly
from recipe import serializers


@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter(
                'users',
                OpenApiTypes.STR,
                description='Comma separated list of User UUIDs to filter.'
            )
        ]
    )
)
class RecipeViewSet(viewsets.ModelViewSet):
    """View for managing Recipe API."""
    serializer_class = serializers.RecipeDetailSerializer
    queryset = Recipe.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        """Retrieve all recipes."""
        users = self.request.query_params.get('users')
        queryset = self.queryset

        if users and users == 'me':
            queryset = queryset.filter(user__id__exact=self.request.user.id)

        elif users:
            users = users.split(',')
            queryset = queryset.filter(user_id__in=users)

        return queryset.distinct()

    def get_serializer_class(self):
        """Return the appropriate serializer class for request."""
        if self.action == 'list':
            return serializers.RecipeSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new recipe."""
        serializer.save(user=self.request.user)
