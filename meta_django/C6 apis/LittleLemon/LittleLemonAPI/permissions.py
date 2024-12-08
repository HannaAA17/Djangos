from rest_framework.permissions import BasePermission, AllowAny

# class IsManagerUser(BasePermission):
#     def has_permission(self, request, view):
#         # return all([
#         #     request.user,
#         #     request.user.is_authenticated,
#         #     request.user.groups.filter(name='Manager').exists(),
#         # ])
#
#         return request.user.groups.filter(name='Manager').exists()


def GroupsPermissionsFactory(groups):
    class GroupsPermissions(BasePermission):
        def has_permission(self, request, view):
            if 'Customer' in groups:
                return request.user.is_authenticated
            
            return request.user.groups.filter(name__in=groups).exists()

    return GroupsPermissions


IsManagerUser = GroupsPermissionsFactory(['Manager'])
IsCustomerUser = GroupsPermissionsFactory(['Customer'])
IsDeliveryUser = GroupsPermissionsFactory(['Delivery crew'])
IsCustomerOrDeliveryUser = GroupsPermissionsFactory(['Customer', 'Delivery crew'])
