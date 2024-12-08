from django.urls import path, include

from .views import MenuItemsView


# menu-items/ and menu-items/<pk>/
# from rest_framework.routers import DefaultRouter
# menu_items_router = DefaultRouter()
# menu_items_router.register(r'menu-items', MenuItemsView, basename='menu-items')

urlpatterns = [
    # *menu_items_router.urls,
    path('menu-items/', MenuItemsView.as_view({'get': 'list', 'post': 'create'})),
    path('menu-items/<int:pk>/', MenuItemsView.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})),
]

