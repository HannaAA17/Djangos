from rest_framework import serializers

from .models import User, MenuItem, Category


class CategorySerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):

        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

    class Meta:
        model = Category
        fields = ['id', 'slug', 'title']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_superuser', 'groups.name')


class MenuItemSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
    )

    category = CategorySerializer(read_only=True, fields=('slug', 'title'))

    # to get/post the category using title instead of the id
    # category = serializers.SlugRelatedField(
    #     queryset=Category.objects.all(),
    #     slug_field='title'
    # )

    class Meta:
        model = MenuItem
        fields = ('id', 'title', 'price', 'featured', 'category_id', 'category')
