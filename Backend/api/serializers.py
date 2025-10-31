from rest_framework import serializers
from .models import Product, SlideBar,addtoCart
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class SlideBarSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlideBar
        fields = '__all__'

class AddToCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = addtoCart
        fields = ['id', 'product', 'quantity']

    def create(self, validated_data):
        user = self.context['request'].user
        return addtoCart.objects.create(buyer=user, **validated_data)
