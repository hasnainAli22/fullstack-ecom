from django.urls import path, re_path
from dj_rest_auth.registration.views import ResendEmailVerificationView, VerifyEmailView

from accounts.views import CustomResendEmailVerificationView
from dj_rest_auth.views import (
    LogoutView,
    PasswordChangeView,
    PasswordResetConfirmView,
    PasswordResetView,
)

app_name = 'accounts'

urlpatterns = [
    path("resend-email-verification/", CustomResendEmailVerificationView.as_view(), name="rest_resend_email"),
    re_path(r"^account-confirm-email/(?P<key>[-:\w]+)/$", VerifyEmailView.as_view(), name="account_confirm_email"),
    path("password/reset/", PasswordResetView.as_view(), name="rest_password_reset"),
    path("password/reset/confirm/<str:uidb64>/<str:token>/", PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    path("password/change/", PasswordChangeView.as_view(), name="rest_password_change"),
    path("logout/", LogoutView.as_view(), name="rest_logout"),
]
