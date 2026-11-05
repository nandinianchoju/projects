from decimal import Decimal, InvalidOperation
from django.contrib.auth import authenticate,login,logout
from django.db import transaction
from django.db.models import Avg,Q
from django.middleware.csrf import get_token
from django.utils import timezone
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from .models import Category,Product,UserPreference,Cart,CartItem,Wishlist,Order,OrderItem,Review,RecentlyViewed
from .serializers import CategorySerializer,ProductSerializer,UserSerializer,RegisterSerializer,PreferenceSerializer,CartSerializer,OrderSerializer,ReviewSerializer

@api_view(["GET"])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def csrf_token(request): return Response({"csrfToken":get_token(request)})

@api_view(["GET"])
@permission_classes([AllowAny])
def home(request): return Response({"message":"Welcome to ShopSphere API","status":"running"})

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    s=RegisterSerializer(data=request.data)
    if s.is_valid():
        u=s.save()
        return Response({"message":"Registration successful","user":UserSerializer(u).data},status=201)
    return Response(s.errors,status=400)

@api_view(["POST"])
@permission_classes([AllowAny])
def user_login(request):
    username=request.data.get("username"); password=request.data.get("password")
    if not username or not password: return Response({"error":"Username and password are required"},status=400)
    user=authenticate(request,username=username,password=password)
    if user is None: return Response({"error":"Invalid username or password"},status=401)
    login(request,user)
    return Response({"message":"Login successful","user":UserSerializer(user).data})

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def user_logout(request):
    logout(request); return Response({"message":"Logged out successfully"})

@api_view(["GET"])
@permission_classes([AllowAny])
def current_user(request):
    return Response({"authenticated":request.user.is_authenticated,"user":UserSerializer(request.user).data if request.user.is_authenticated else None})

@api_view(["GET","PATCH","PUT"])
@permission_classes([IsAuthenticated])
def profile(request):
    if request.method=="GET": return Response(UserSerializer(request.user).data)
    s=UserSerializer(request.user,data=request.data,partial=True)
    if s.is_valid(): s.save(); return Response(s.data)
    return Response(s.errors,status=400)

@api_view(["GET"])
@permission_classes([AllowAny])
def category_list(request): return Response({"categories":CategorySerializer(Category.objects.all(),many=True).data})

@api_view(["GET"])
@permission_classes([AllowAny])
def product_list(request):
    qs=Product.objects.filter(is_active=True).select_related("category").annotate(avg_rating=Avg("reviews__rating"))
    q=request.query_params.get("q") or request.query_params.get("search")
    cat=request.query_params.get("category")
    if q: qs=qs.filter(Q(name__icontains=q)|Q(description__icontains=q))
    if cat: qs=qs.filter(Q(category__slug=cat)|Q(category__name__iexact=cat))
    try:
        if request.query_params.get("min_price"): qs=qs.filter(price__gte=Decimal(request.query_params["min_price"]))
        if request.query_params.get("max_price"): qs=qs.filter(price__lte=Decimal(request.query_params["max_price"]))
        if request.query_params.get("rating"): qs=qs.filter(avg_rating__gte=Decimal(request.query_params["rating"]))
    except (InvalidOperation,ValueError): return Response({"error":"Invalid price or rating filter"},status=400)
    sort=request.query_params.get("sort")
    if sort=="price-low": qs=qs.order_by("price")
    elif sort=="price-high": qs=qs.order_by("-price")
    elif sort=="popular": qs=qs.order_by("-avg_rating","-rating")
    elif sort=="newest": qs=qs.order_by("-created_at")
    return Response({"products":ProductSerializer(qs,many=True).data,"count":qs.count()})

@api_view(["GET"])
@permission_classes([AllowAny])
def product_detail(request,product_id):
    p=Product.objects.filter(id=product_id,is_active=True).select_related("category").first()
    if not p: return Response({"error":"Product not found"},status=404)
    if request.user.is_authenticated: RecentlyViewed.objects.update_or_create(user=request.user,product=p,defaults={"viewed_at":timezone.now()})
    return Response(ProductSerializer(p).data)

@api_view(["GET","PUT","PATCH"])
@permission_classes([IsAuthenticated])
def preferences(request):
    obj,_=UserPreference.objects.get_or_create(user=request.user)
    if request.method=="GET": return Response(PreferenceSerializer(obj).data)
    s=PreferenceSerializer(obj,data=request.data,partial=True)
    if s.is_valid(): s.save(); return Response(s.data)
    return Response(s.errors,status=400)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def recommendations(request):
    pref,_=UserPreference.objects.get_or_create(user=request.user)
    qs=Product.objects.filter(is_active=True)
    if pref.categories.exists(): qs=qs.filter(category__in=pref.categories.all()).distinct()
    else: qs=qs.order_by("-rating")
    return Response({"products":ProductSerializer(qs[:20],many=True).data})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def recently_viewed(request):
    rows=RecentlyViewed.objects.filter(user=request.user).select_related("product","product__category")[:20]
    return Response({"products":ProductSerializer([x.product for x in rows],many=True).data})

def user_cart(user): return Cart.objects.get_or_create(user=user)[0]

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def cart_detail(request): return Response(CartSerializer(user_cart(request.user)).data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    try:
        pid=int(request.data.get("product_id")); qty=int(request.data.get("quantity",1))
        if qty<1: raise ValueError
    except (TypeError,ValueError): return Response({"error":"Valid product_id and positive quantity required"},status=400)
    p=Product.objects.filter(id=pid,is_active=True).first()
    if not p: return Response({"error":"Product not found"},status=404)
    cart=user_cart(request.user); item,created=CartItem.objects.get_or_create(cart=cart,product=p,defaults={"quantity":qty})
    if not created: item.quantity+=qty
    if item.quantity>p.stock:
        if created: item.delete()
        return Response({"error":"Requested quantity exceeds available stock"},status=400)
    item.save()
    return Response(CartSerializer(cart).data,status=201 if created else 200)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_cart_item(request,item_id):
    item=CartItem.objects.filter(id=item_id,cart__user=request.user).select_related("product").first()
    if not item: return Response({"error":"Cart item not found"},status=404)
    try:
        qty=int(request.data.get("quantity"))
        if qty<1: raise ValueError
    except (TypeError,ValueError): return Response({"error":"Quantity must be positive"},status=400)
    if qty>item.product.stock: return Response({"error":"Not enough stock"},status=400)
    item.quantity=qty; item.save(update_fields=["quantity"])
    return Response(CartSerializer(item.cart).data)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_cart_item(request,item_id):
    count,_=CartItem.objects.filter(id=item_id,cart__user=request.user).delete()
    if not count: return Response({"error":"Cart item not found"},status=404)
    return Response({"message":"Item removed from cart"})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def wishlist_list(request):
    rows=Wishlist.objects.filter(user=request.user).select_related("product","product__category")
    return Response({"products":ProductSerializer([x.product for x in rows],many=True).data})

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_wishlist(request):
    p=Product.objects.filter(id=request.data.get("product_id"),is_active=True).first()
    if not p: return Response({"error":"Product not found"},status=404)
    _,created=Wishlist.objects.get_or_create(user=request.user,product=p)
    return Response({"message":"Added to wishlist" if created else "Already in wishlist"},status=201 if created else 200)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_from_wishlist(request,product_id):
    count,_=Wishlist.objects.filter(user=request.user,product_id=product_id).delete()
    if not count: return Response({"error":"Wishlist item not found"},status=404)
    return Response({"message":"Removed from wishlist"})

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def place_order(request):
    address=request.data.get("shipping_address")
    if not isinstance(address,str) or not address.strip(): return Response({"error":"Shipping address required"},status=400)
    try:
        with transaction.atomic():
            cart=Cart.objects.get(user=request.user)
            items=list(cart.items.select_related("product").select_for_update())
            if not items: return Response({"error":"Cart is empty"},status=400)
            subtotal=Decimal("0.00"); locked={}
            for item in items:
                p=Product.objects.select_for_update().get(pk=item.product_id); locked[p.pk]=p
                if not p.is_active or p.stock<item.quantity: return Response({"error":f"Insufficient stock for {p.name}"},status=400)
                subtotal+=p.price*item.quantity
            shipping=Decimal("0.00") if subtotal>=Decimal("999.00") else Decimal("49.00")
            order=Order.objects.create(user=request.user,subtotal=subtotal,shipping_fee=shipping,total_amount=subtotal+shipping,shipping_address=address.strip())
            for item in items:
                p=locked[item.product_id]
                OrderItem.objects.create(order=order,product=p,product_name=p.name,price=p.price,quantity=item.quantity)
                p.stock-=item.quantity; p.save(update_fields=["stock"])
            cart.items.all().delete()
        return Response({"message":"Order placed successfully","order":OrderSerializer(order).data},status=201)
    except Cart.DoesNotExist: return Response({"error":"Cart not found"},status=404)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def order_history(request):
    qs=Order.objects.filter(user=request.user).prefetch_related("items").order_by("-created_at")
    return Response({"orders":OrderSerializer(qs,many=True).data})

@api_view(["GET","POST"])
@permission_classes([AllowAny])
def product_reviews(request,product_id):
    p=Product.objects.filter(id=product_id,is_active=True).first()
    if not p: return Response({"error":"Product not found"},status=404)
    if request.method=="GET":
        return Response({"reviews":ReviewSerializer(Review.objects.filter(product=p).select_related("user"),many=True).data})
    if not request.user.is_authenticated: return Response({"error":"Login required"},status=401)
    s=ReviewSerializer(data=request.data)
    if s.is_valid():
        review,created=Review.objects.update_or_create(user=request.user,product=p,defaults={"rating":s.validated_data["rating"],"comment":s.validated_data.get("comment","")})
        p.rating=Review.objects.filter(product=p).aggregate(a=Avg("rating"))["a"] or 0
        p.save(update_fields=["rating"])
        return Response(ReviewSerializer(review).data,status=201 if created else 200)
    return Response(s.errors,status=400)
