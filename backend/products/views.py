# products/views.py

from rest_framework import permissions, viewsets, status, filters, generics, permissions
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.core.files.uploadedfile import InMemoryUploadedFile
from products.models import (
    Product,
    ProductCategory,
    Cart,
    CartItem,
)
from products.permissions import IsSellerOrAdmin
from products.serializers import (
    ProductCategoryReadSerializer,
    ImageSearchSerializer,
    ProductReadSerializer,
    ProductWriteSerializer,
    CartSerializer,
    CartItemSerializer,
    # OrderSerializer,
    
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
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
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


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'], url_path='add-item')
    def add_item(self, request):
        user = request.user
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        
        cart, created = Cart.objects.get_or_create(user=user)
        product = Product.objects.get(id=product_id)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        
        if not created:
            cart_item.quantity += int(quantity)
        cart_item.save()
        
        serializer = self.get_serializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='remove-item')
    def remove_item(self, request):
        user = request.user
        product_id = request.data.get('product_id')
        
        cart = Cart.objects.get(user=user)
        product = Product.objects.get(id=product_id)
        cart_item = CartItem.objects.get(cart=cart, product=product)
        cart_item.delete()
        
        serializer = self.get_serializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='my-cart')
    def my_cart(self, request):
        user = request.user
        cart = Cart.objects.get(user=user)
        
        serializer = self.get_serializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'], url_path='clear-cart')
    def clear_cart(self, request):
        user = request.user
        cart = Cart.objects.get(user=user)
        
        cart.items.all().delete()
        
        serializer = self.get_serializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)