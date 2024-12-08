from rest_framework import serializers
from rest_framework.validators import UniqueValidator, UniqueTogetherValidator

from decimal import Decimal

from .models import MenuItem, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'slug', 'title']


class MenuItemSerializer(serializers.ModelSerializer):
    # Method 1: Conditions in the field
    # price = serializers.DecimalField(max_digits=5, decimal_places=2, min_value=0) 
    # stock = serializers.IntegerField(source='inventory')

    price_after_tax = serializers.SerializerMethodField(method_name='calculate_tax')
    category_id = serializers.IntegerField(write_only=True)
    category = CategorySerializer(read_only=True)

    # Method:3 Using validate_field() method 
    # def validate_price(self, value):
    #     if value < 2:
    #         raise serializers.ValidationError('Price must be greater than 2')
    #     return value
    # 
    # Method 4: Using the validate() method
    # def validate(self, attrs):
    #     if attrs['price'] < 2:
    #         raise serializers.ValidationError('Price must be greater than 2')
    #     return super().validate(attrs)
    
    class Meta:
        model = MenuItem
        
        fields = [
            'id', 'title', 'price', 'price_after_tax', 'stock', 
            'category', 'category_id', 
        ]

        # Method 2: Using keyword arguments in the Meta class
        extra_kwargs = {
            'price': { 'min_value':2 },
            'stock': { 'source':'inventory', 'min_value':0 },
        }

        # Unique validations
        validators = [
            # UniqueValidator(
            #     queryset=MenuItem.objects.all(),
            # ),
            
            UniqueTogetherValidator(
                queryset=MenuItem.objects.all(),
                fields=['title', 'price'],
            ),
        ]
        
        
    def calculate_tax(self, product: MenuItem):
        return product.price * Decimal(1.1)
