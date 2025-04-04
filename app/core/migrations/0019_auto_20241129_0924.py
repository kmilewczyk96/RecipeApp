# Generated by Django 3.2.25 on 2024-11-29 09:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0018_recipe__steps'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='alt_unit',
            field=models.CharField(blank=True, choices=[('pc', 'piece'), ('tsp', 'teaspoon'), ('p', 'pinch')], default='', max_length=8),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='ingredient',
            name='unit',
            field=models.CharField(choices=[('g', 'gram'), ('ml', 'milliliter')], default='g', max_length=8),
        ),
    ]
