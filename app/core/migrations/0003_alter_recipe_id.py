# Generated by Django 3.2.25 on 2024-10-11 15:09

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_recipe'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipe',
            name='id',
        ),
        migrations.AddField(
            model_name='recipe',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]
