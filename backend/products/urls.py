from django.urls import include, path
from rest_framework.routers import DefaultRouter
from products.views import (
    ProductCategoryViewSet,
    ProductViewSet,
    ImageSearchView,
    CartViewSet,
)

app_name = "products"

router = DefaultRouter()
router.register(r"categories", ProductCategoryViewSet)
router.register(r"products", ProductViewSet)
router.register(r'carts', CartViewSet, basename='cart')

urlpatterns = [
    path("", include(router.urls)),
    path("search_with_image/", ImageSearchView.as_view(), name="search_with_image_view"),
]
