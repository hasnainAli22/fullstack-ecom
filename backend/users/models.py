from django.db import models
from django.utils.translation import gettext as _
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
    Group,
    Permission
)


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            email=email,
            **kwargs
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **kwargs):
        user = self.create_user(
            email,
            password=password,
            **kwargs
        )

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, max_length=255)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']


    def __str__(self):
        return self.email
    

from django.db import models
from django.contrib.auth.models import User

class Address(models.Model):
    ADDRESS_TYPES = [
        ('home', 'Home'),
        ('office', 'Office'),
    ]

    user = models.ForeignKey(UserAccount, related_name="addresses", on_delete=models.CASCADE)
    default_billing = models.BooleanField(default=False)
    default_shipping = models.BooleanField(default=False)
    city = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    landmark = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20, blank=True)
    address_type = models.CharField(max_length=10, choices=ADDRESS_TYPES, default='home')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    phone_number = models.CharField(max_length=15, blank=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.user.first_name} - {self.get_address_type_display()}"

    def save(self, *args, **kwargs):
        # Ensure only one default billing address and one default shipping address per user
        if self.default_billing:
            Address.objects.filter(user=self.user, default_billing=True).exclude(id=self.id).update(default_billing=False)
        if self.default_shipping:
            Address.objects.filter(user=self.user, default_shipping=True).exclude(id=self.id).update(default_shipping=False)
        super().save(*args, **kwargs)
