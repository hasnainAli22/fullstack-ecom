# products/models.py

from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _
import numpy as np
import base64

User = get_user_model()

def category_image_path(instance, filename):
    return f"product/category/icons/{instance.name}/{filename}"

def product_image_path(instance, filename):
    return f"product/images/{instance.name}/{filename}"

class ProductCategory(models.Model):
    name = models.CharField(_("Category name"), max_length=100)
    icon = models.ImageField(upload_to=category_image_path, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Product Category")
        verbose_name_plural = _("Product Categories")

    def __str__(self):
        return self.name

def get_default_product_category():
    return ProductCategory.objects.get_or_create(name="Others")[0]

class Product(models.Model):
    seller = models.ForeignKey(User, related_name="products", on_delete=models.CASCADE)
    category = models.ForeignKey(
        ProductCategory,
        related_name="product_list",
        on_delete=models.SET(get_default_product_category),
    )
    name = models.CharField(max_length=200)
    desc = models.TextField(_("Description"), blank=True)
    image = models.ImageField(upload_to=product_image_path, blank=True)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    quantity = models.IntegerField(default=1)
    features = models.BinaryField(blank=True)  # Add this field to store image features
    discounted_price = models.DecimalField(decimal_places=2, max_digits=10, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return self.name

    def serialize_features(self, features):
        self.features = features.tobytes()

    def deserialize_features(self):
        return np.frombuffer(self.features, dtype=np.float32)

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart for {self.user.email}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items', null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.product.name}"