# Generated by Django 5.0.3 on 2024-07-01 00:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_address'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='address',
            name='address_type',
        ),
    ]