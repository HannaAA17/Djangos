from rest_framework import generics

from .models import Book
from .serializers import BookSerializer

# Create your views here.
class BookView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDetailView(generics.RetrieveUpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

"""tests
###
GET http://127.0.0.1:8000/api/books
###
GET http://127.0.0.1:8000/api/books/1
###
POST http://127.0.0.1:8000/api/books
content-type: application/json

{
    "title": "The Hobbit 2",
    "author": "J.R.R. Tolkien",
    "price": 14.66
}
###

"""