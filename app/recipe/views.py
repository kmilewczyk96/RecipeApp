"""Views for Recipe API."""
from drf_spectacular.utils import (
    extend_schema,
    extend_schema_view,
    OpenApiParameter,
    OpenApiTypes,
)

from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import (
    Ingredient,
    Recipe,
    Tag,
)
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
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Retrieve all recipes."""
        users = self.request.query_params.get('users')
        queryset = self.queryset

        if users and users == 'me':
            queryset = queryset.filter(user__id__exact=self.request.user.id)

        elif users:
            users = users.split(',')
            queryset = queryset.filter(user_id__in=users)

        return queryset.distinct().order_by('-created')

    def get_serializer_class(self):
        """Return the appropriate serializer class for request."""
        if self.action == 'list':
            return serializers.RecipeSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new recipe."""
        serializer.save(user=self.request.user)


class TagListView(ListAPIView):
    """View for listing Tag API."""
    serializer_class = serializers.TagSerializer
    queryset = Tag.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class IngredientListView(ListAPIView):
    """View for listing Ingredient API."""
    serializer_class = serializers.IngredientSerializer
    queryset = Ingredient.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class RecipeFormHelpers(APIView):
    """Get choice fields for RecipeForm."""
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses=serializers.RecipeFormHelperSerializer,
    )
    def get(self, request):
        helpers = {
            'cuisine_choices': {key: value for key, value in Recipe.CUISINES},
            'type_choices': {key: value for key, value in Recipe.TYPES},
            'ingredients': serializers.IngredientSerializer(Ingredient.objects.all(), many=True).data,
            'csv_separator': Recipe.CSV_SEPARATOR,
        }

        return Response(helpers)
