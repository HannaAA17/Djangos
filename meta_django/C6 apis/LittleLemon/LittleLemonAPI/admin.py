from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

from .models import Category, MenuItem, Cart, Order, OrderItem

# show the groups in the admin panel when you list the users
class UserAdminWithGroup(UserAdmin):
    def group_name(self, obj):
        queryset = obj.groups.values_list('name', flat=True)
        return ', '.join(group for group in queryset)

    list_display = UserAdmin.list_display + ('group_name',)

admin.site.unregister(User)
admin.site.register(User, UserAdminWithGroup)

admin.site.register(Category)
admin.site.register(MenuItem)
admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(OrderItem)