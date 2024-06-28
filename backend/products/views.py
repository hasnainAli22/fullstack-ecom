# products/views.py

from rest_framework import permissions, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.files.uploadedfile import InMemoryUploadedFile
from products.models import (
    Product,
    ProductCategory,
    CartItem,
    Order,
)
from products.permissions import IsSellerOrAdmin
from products.serializers import (
    ProductCategoryReadSerializer,
    ImageSearchSerializer,
    ProductReadSerializer,
    ProductWriteSerializer,
    CartItemSerializer,
    OrderSerializer,
    
    )
from django_filters.rest_framework import DjangoFilterBackend

from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from products.utils import extract_features_from_image, find_similar_products


class ProductCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List and Retrieve product categories
    """
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategoryReadSerializer
    permission_classes = (permissions.AllowAny,)

class ProductViewSet(viewsets.ModelViewSet):
    """
    CRUD Products
    """
    queryset = Product.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category',] 
    search_fields = ['name',]  
    ordering_fields = ['price', 'name']  
    ordering = ['price'] 

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return ProductWriteSerializer
        return ProductReadSerializer

    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (permissions.IsAuthenticated,)
        elif self.action in ("update", "partial_update", "destroy"):
            self.permission_classes = (IsSellerOrAdmin,)
        else:
            self.permission_classes = (permissions.AllowAny,)
        return super().get_permissions()
    

class ImageSearchView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, *args, **kwargs):
        serializer = ImageSearchSerializer(data=request.data)
        if serializer.is_valid():
            image = serializer.validated_data['image']
            if isinstance(image, InMemoryUploadedFile):
                image_name = image.name
                image_path = default_storage.save(image_name, ContentFile(image.read()))
                image_full_path = default_storage.path(image_path)
                features = extract_features_from_image(image_full_path)

                similar_products = find_similar_products(features)

                product_serializer = ProductReadSerializer(similar_products, many=True)
                return Response(product_serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartItemViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)