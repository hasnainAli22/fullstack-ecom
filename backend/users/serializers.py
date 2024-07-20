from rest_framework import serializers
from .models import Address

class AddressSerializer(serializers.ModelSerializer):
    """
    Serializer class to seralize Address model
    """
    user = serializers.CharField(source="user.first_name")
    class Meta:
        model = Address
        fields = ['id', 'user', 'default_billing', 'default_shipping', 'city', 'street', 'landmark', 'postal_code', 'address_type', 'phone_number', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']

