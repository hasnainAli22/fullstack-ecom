from django.urls import path, re_path
from .views import (
    CustomProviderAuthView,
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    CustomTokenVerifyView,
    LogoutView,
    AddressListView,
    AddressCreateView,
    DefaultShippingAddressView,
    AddressUpdateView,
    AddressDeleteView,
)
# app_name = 'users'
urlpatterns = [
    re_path(
        r'^o/(?P<provider>\S+)/$',
        CustomProviderAuthView.as_view(),
        name='provider-auth'
    ),
    path('jwt/create/', CustomTokenObtainPairView.as_view()),
    path('jwt/refresh/', CustomTokenRefreshView.as_view()),
    path('jwt/verify/', CustomTokenVerifyView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('addresses/', AddressListView.as_view(), name='address-list'),
    path('addresses/default-shipping/', DefaultShippingAddressView.as_view(), name='default-shipping-address'),
    path('addresses/add/', AddressCreateView.as_view(), name='address-add'),
    path('addresses/update/<int:pk>/', AddressUpdateView.as_view(), name='address-update'),
    path('addresses/<int:pk>/delete/', AddressDeleteView.as_view(), name='address-delete' )
]

