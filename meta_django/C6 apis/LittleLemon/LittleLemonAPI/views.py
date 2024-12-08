from rest_framework import viewsets, generics

from .permissions import AllowAny, IsManagerUser, IsCustomerUser, IsDeliveryUser, IsCustomerOrDeliveryUser
from .models import User, Category, MenuItem, Cart, Order, OrderItem
from .serializers import UserSerializer, MenuItemSerializer

# class ManagerUserList(generics.ListAPIView):
#     queryset = User.objects.all().order_by('username')
#     serializer_class = UserSerializer
#     permission_classes = (IsManagerUser,)


class MenuItemsView(viewsets.ModelViewSet):
    queryset = MenuItem.objects.select_related('category').all()
    serializer_class = MenuItemSerializer
    
    def get_permissions(self):
        permission_classes = []
        
        # print(self.action, self.request.method, self.request.user.groups.all())
        
        if self.action in ['retrieve', 'list']:
            permission_classes = [IsCustomerUser]
        
        elif self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsManagerUser]
        
        # else:
        #     permission_classes = [AllowAny]
        
        return [permission() for permission in permission_classes]