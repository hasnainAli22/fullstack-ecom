from rest_framework import serializers
class CustomResendEmailVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
