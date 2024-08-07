from rest_framework import serializers
from .models import Address

class AddressSerializer(serializers.ModelSerializer):
    """
    Serializer class to seralize Address model
    """
    # user = serializers.CharField(source="user.first_name")
    class Meta:
        model = Address
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']

