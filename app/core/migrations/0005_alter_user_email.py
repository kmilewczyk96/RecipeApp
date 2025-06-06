# Generated by Django 5.2.1 on 2025-05-31 18:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_rename_name_user_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(error_messages={'unique': 'This email is already registered.'}, max_length=255, unique=True),
        ),
    ]
