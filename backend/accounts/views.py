from django.utils.translation import gettext as _
from rest_framework import permissions, status

from rest_framework.response import Response
from allauth.account.models import EmailAddress
from rest_framework.views import APIView
from accounts.serializers import CustomResendEmailVerificationSerializer

class CustomResendEmailVerificationView(APIView):
    serializer_class = CustomResendEmailVerificationSerializer
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        if not email:
            return Response({"email": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            email_address = EmailAddress.objects.get(email=email)
            email_address.send_confirmation(request)
            return Response({"detail": "ok"}, status=status.HTTP_200_OK)
        except EmailAddress.DoesNotExist:
            return Response({"email": "Email address not found."}, status=status.HTTP_400_BAD_REQUEST)
