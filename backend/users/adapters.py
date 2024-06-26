# accounts/adapters.py
from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site

class CustomAccountAdapter(DefaultAccountAdapter):
    def send_confirmation_mail(self, request, emailconfirmation, signup):
        current_site = get_current_site(request)
        activate_url = f"{settings.FRONTEND_URL}/confirm-email/{emailconfirmation.key}"
        context = {
            "user": emailconfirmation.email_address.user,
            "activate_url": activate_url,
            "current_site": current_site,
            "key": emailconfirmation.key,
        }
        self.send_mail("account/email/email_confirmation", emailconfirmation.email_address.email, context)
