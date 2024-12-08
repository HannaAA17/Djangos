from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class RatingsView(generics.ListAPIView):

    def get_permissions(self):
        if self.request.method == 'GET':
            return []

        return [IsAuthenticated()]

