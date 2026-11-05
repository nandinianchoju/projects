import uuid
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone

class Category(models.Model):
    name=models.CharField(max_length=60, unique=True)
    slug=models.SlugField(unique=True)
    parent=models.ForeignKey("self",on_delete=models.SET_NULL,null=True,blank=True,related_name="subcategories")
    class Meta: ordering=["name"]
    def __str__(self): return self.name

class Product(models.Model):
    category=models.ForeignKey(Category,on_delete=models.PROTECT,related_name="products")
    name=models.CharField(max_length=120)
    description=models.TextField(blank=True)
    price=models.DecimalField(max_digits=10,decimal_places=2,validators=[MinValueValidator(0)])
    emoji=models.CharField(max_length=20,default="🛍️")
    color=models.CharField(max_length=20,default="#E0E7FF")
    image_url=models.URLField(blank=True)
    stock=models.PositiveIntegerField(default=0)
    rating=models.DecimalField(max_digits=2,decimal_places=1,default=4.0,validators=[MinValueValidator(0),MaxValueValidator(5)])
    is_active=models.BooleanField(default=True)
    created_at=models.DateTimeField(auto_now_add=True)
    class Meta: ordering=["-created_at"]
    def __str__(self): return self.name

class UserPreference(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name="preferences")
    categories=models.ManyToManyField(Category,blank=True,related_name="interested_users")
    interests=models.JSONField(default=list,blank=True)

class Cart(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name="cart")
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    @property
    def subtotal(self): return sum((x.product.price*x.quantity for x in self.items.select_related("product").all()), start=0)
    @property
    def shipping_fee(self): return 0 if self.subtotal==0 or self.subtotal>=999 else 49
    @property
    def total(self): return self.subtotal+self.shipping_fee

class CartItem(models.Model):
    cart=models.ForeignKey(Cart,on_delete=models.CASCADE,related_name="items")
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField(default=1,validators=[MinValueValidator(1)])
    class Meta: constraints=[models.UniqueConstraint(fields=["cart","product"],name="unique_product_per_cart")]

class Wishlist(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="wishlist_items")
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)
    class Meta: constraints=[models.UniqueConstraint(fields=["user","product"],name="unique_user_wishlist_product")]

class Order(models.Model):
    STATUS_CHOICES=[("PLACED","Placed"),("CONFIRMED","Confirmed"),("SHIPPED","Shipped"),("DELIVERED","Delivered"),("CANCELLED","Cancelled")]
    order_id=models.CharField(max_length=40,unique=True,editable=False)
    user=models.ForeignKey(User,on_delete=models.PROTECT,related_name="orders")
    subtotal=models.DecimalField(max_digits=10,decimal_places=2)
    shipping_fee=models.DecimalField(max_digits=10,decimal_places=2)
    total_amount=models.DecimalField(max_digits=10,decimal_places=2)
    status=models.CharField(max_length=20,choices=STATUS_CHOICES,default="PLACED")
    shipping_address=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    def save(self,*args,**kwargs):
        if not self.order_id: self.order_id="SS-"+uuid.uuid4().hex[:12].upper()
        super().save(*args,**kwargs)
    def __str__(self): return self.order_id

class OrderItem(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE,related_name="items")
    product=models.ForeignKey(Product,on_delete=models.PROTECT)
    product_name=models.CharField(max_length=120)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    quantity=models.PositiveIntegerField()

class Review(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="reviews")
    product=models.ForeignKey(Product,on_delete=models.CASCADE,related_name="reviews")
    rating=models.PositiveSmallIntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)])
    comment=models.TextField(blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    class Meta: constraints=[models.UniqueConstraint(fields=["user","product"],name="one_review_per_user_product")]

class RecentlyViewed(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="recently_viewed")
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    viewed_at=models.DateTimeField(default=timezone.now)
    class Meta:
        ordering=["-viewed_at"]
        constraints=[models.UniqueConstraint(fields=["user","product"],name="unique_recently_viewed_product")]
