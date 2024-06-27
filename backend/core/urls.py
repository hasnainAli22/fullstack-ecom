from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
# from users.views import GoogleLogin

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include('djoser.urls')),
    # path('api/', include('users.urls')),
    path("api/", include("users.urls"), name="users"),
    path("api/products/", include("products.urls", namespace="products")),
    # path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    # path("api/accounts/", include("accounts.urls", namespace="accounts")),  # Include accounts app URLs
    # path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # path("", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
]

# Media Assets
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)