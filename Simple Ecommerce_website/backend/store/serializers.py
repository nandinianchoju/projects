from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Category,Product,UserPreference,Cart,CartItem,Order,OrderItem,Review

class CategorySerializer(serializers.ModelSerializer):
    class Meta: model=Category; fields=["id","name","slug","parent"]

class ProductSerializer(serializers.ModelSerializer):
    category=serializers.CharField(source="category.name",read_only=True)
    category_slug=serializers.CharField(source="category.slug",read_only=True)
    review_count=serializers.SerializerMethodField()
    class Meta:
        model=Product
        fields=["id","name","description","price","category","category_slug","emoji","color","image_url","stock","rating","review_count"]
    def get_review_count(self,obj): return obj.reviews.count()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["id","username","email","first_name","last_name"]
        read_only_fields=["id","username"]

class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True,min_length=8,trim_whitespace=False)
    class Meta:
        model=User
        fields=["username","email","password","first_name","last_name"]
    def create(self,data):
        from .models import UserPreference
        user=User.objects.create_user(**data)
        UserPreference.objects.create(user=user)
        Cart.objects.create(user=user)
        return user

class PreferenceSerializer(serializers.ModelSerializer):
    categories=serializers.PrimaryKeyRelatedField(many=True,queryset=Category.objects.all(),required=False)
    class Meta: model=UserPreference; fields=["categories","interests"]

class CartItemSerializer(serializers.ModelSerializer):
    product=ProductSerializer(read_only=True)
    product_id=serializers.IntegerField(write_only=True)
    line_total=serializers.SerializerMethodField()
    class Meta: model=CartItem; fields=["id","product","product_id","quantity","line_total"]
    def get_line_total(self,obj): return str(obj.product.price*obj.quantity)

class CartSerializer(serializers.ModelSerializer):
    items=CartItemSerializer(many=True,read_only=True)
    subtotal=serializers.SerializerMethodField()
    shipping_fee=serializers.SerializerMethodField()
    total=serializers.SerializerMethodField()
    class Meta: model=Cart; fields=["id","items","subtotal","shipping_fee","total"]
    def get_subtotal(self,obj): return str(obj.subtotal)
    def get_shipping_fee(self,obj): return str(obj.shipping_fee)
    def get_total(self,obj): return str(obj.total)

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta: model=OrderItem; fields=["product_name","price","quantity"]
class OrderSerializer(serializers.ModelSerializer):
    items=OrderItemSerializer(many=True,read_only=True)
    class Meta:
        model=Order
        fields=["order_id","subtotal","shipping_fee","total_amount","status","shipping_address","created_at","items"]

class ReviewSerializer(serializers.ModelSerializer):
    username=serializers.CharField(source="user.username",read_only=True)
    class Meta:
        model=Review
        fields=["id","username","rating","comment","created_at"]
        read_only_fields=["id","username","created_at"]
