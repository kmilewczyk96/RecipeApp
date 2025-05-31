from core import models

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _


class UserAdmin(BaseUserAdmin):
    """Custom Admin Page for Users."""
    ordering = ['id']
    list_display = ['email', 'username']
    fieldsets = (
        (
            None,
            {
                'fields': (
                    'email',
                    'username',
                    'password',
                )
            }
        ),
        (
            _('Permissions'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                    'is_verified',
                )
            }
        ),
        (
            _('Important Dates'),
            {
                'fields': (
                    'last_login',
                    'created',
                    'modified',
                )
            }
        )
    )
    readonly_fields = [
        'last_login',
        'created',
        'modified',
    ]
    add_fieldsets = (
        (
            None,
            {
                'classes': (
                    'wide',
                ),
                'fields': (
                    'email',
                    'password1',
                    'password2',
                    'username',
                    'is_active',
                    'is_staff',
                    'is_superuser',
                    'is_verified',
                    'created',
                    'modified',
                ),
            }
        ),
    )


admin.site.register(models.User, UserAdmin)
admin.site.register(models.Recipe)
admin.site.register(models.Tag)
admin.site.register(models.Ingredient)
admin.site.register(models.RecipeIngredient)
