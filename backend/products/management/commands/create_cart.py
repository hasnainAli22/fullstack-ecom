# Create a management command to ensure every user has a cart

# products/management/commands/create_carts.py

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from products.models import Cart

User = get_user_model()

class Command(BaseCommand):
    help = 'Create a cart for each user if they do not already have one'

    def handle(self, *args, **kwargs):
        users_without_carts = User.objects.filter(cart__isnull=True)
        for user in users_without_carts:
            Cart.objects.create(user=user)
            self.stdout.write(self.style.SUCCESS(f'Created cart for {user.username}'))
