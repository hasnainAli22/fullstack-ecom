# Generated by Django 5.0.3 on 2024-06-25 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='discounted_price',
            field=models.DecimalField(decimal_places=2, max_digits=10, null=True),
        ),
    ]