from django.contrib import admin
from django.urls import path, include

from .views import BookView, BookDetailView

urlpatterns = [
    path('books', BookView.as_view(), name='books'),
    path('books/<int:pk>', BookDetailView.as_view(), name='book_detail'),
]
