from django.urls import path
from . import views

urlpatterns = [
    # generic views
    path('g/menu-items', views.MenuItemListView.as_view()),
    path('g/menu-items/<int:pk>', views.singleMenuItemView.as_view()),
    path('g/category', views.CategoriesView.as_view()),
    
    # viewsets
    path('menu-items', views.MenuItemViewSet.as_view({'get': 'list'})),
    path('menu-items/<int:pk>', views.MenuItemViewSet.as_view({'get': 'retrieve'})),
]

from rest_framework.authtoken.views import obtain_auth_token
urlpatterns += [
    # secure view
    path('secured/', views.secure_view.as_view()),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
]


urlpatterns += [
    path('throttled/',  views.ThrottledView.as_view()),
    path('throttled-auth/',  views.ThrottledAuthView.as_view()),
]

'''
###
GET http://127.0.0.1:8000/api/secured/
accept: application/json
Authorization: Token f0f841c14a654e8b560a0d8019009abd0747b021

###
POST http://127.0.0.1:8000/api/api-token-auth/
accept: application/json
content-type: application/json

{
    "username": "hanna",
    "password": "hanna"
}
###
GET http://127.0.0.1:8000/api/throttled/
accept: application/json
Authorization: Token f0f841c14a654e8b560a0d8019009abd0747b021
###
GET http://127.0.0.1:8000/api/throttled-auth/
accept: application/json
Authorization: Token f0f841c14a654e8b560a0d8019009abd0747b021
'''