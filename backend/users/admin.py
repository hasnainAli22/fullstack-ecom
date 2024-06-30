from django.contrib import admin
from .models import UserAccount, Address

# Register your models here.
admin.site.register(Address)
@admin.register(UserAccount)
class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'is_active', 'is_staff', 'is_superuser')
    search_fields = ('name',)