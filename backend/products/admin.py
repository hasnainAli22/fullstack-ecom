from django.contrib import admin
from products.models import Product, ProductCategory, Cart, CartItem

class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'features', 'price'] 

admin.site.register(ProductCategory)
admin.site.register(Product, ProductAdmin)

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user','created_at')
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart','product','quantity')
