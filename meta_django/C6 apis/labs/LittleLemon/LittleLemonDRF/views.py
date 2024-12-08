from rest_framework import generics, viewsets

from .models import MenuItem, Category
from .serializers import MenuItemSerializer, CategorySerializer


# Create your views here.
class CategoriesView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class MenuItemListView(generics.ListCreateAPIView):
    # its very important to use select_related here
    queryset = MenuItem.objects.select_related('category').all()
    serializer_class = MenuItemSerializer

class singleMenuItemView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    ordering_fields = ['price', 'inventory']
    search_fields = ['title', 'category__title']


from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class secure_view(generics.GenericAPIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response('Hello, World!')

# from rest_framework.decorators import permission_classes, api_view
# 
# @api_view()
# @permission_classes([IsAuthenticated])
# def secure_view(request):
#     return Response('Hello, World!')

from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from .throttles import TenPerMinuteThrottle
class ThrottledView(generics.GenericAPIView):
    throttle_classes = [AnonRateThrottle, TenPerMinuteThrottle]
    
    def get(self, request):
        return Response('Hello, World!')


class ThrottledAuthView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]
    
    def get(self, request):
        return Response('Hello, World!')