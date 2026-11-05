from django.urls import path
from . import views
urlpatterns = [
 path("",views.home), path("api/csrf/",views.csrf_token),
 path("api/register/",views.register), path("api/login/",views.user_login),
 path("api/logout/",views.user_logout), path("api/me/",views.current_user),
 path("api/profile/",views.profile), path("api/categories/",views.category_list),
 path("api/products/",views.product_list), path("api/products/<int:product_id>/",views.product_detail),
 path("api/preferences/",views.preferences), path("api/recommendations/",views.recommendations),
 path("api/recently-viewed/",views.recently_viewed), path("api/cart/",views.cart_detail),
 path("api/cart/add/",views.add_to_cart), path("api/cart/items/<int:item_id>/",views.update_cart_item),
 path("api/cart/items/<int:item_id>/remove/",views.remove_cart_item),
 path("api/wishlist/",views.wishlist_list), path("api/wishlist/add/",views.add_to_wishlist),
 path("api/wishlist/<int:product_id>/remove/",views.remove_from_wishlist),
 path("api/orders/",views.order_history), path("api/orders/place/",views.place_order),
 path("api/products/<int:product_id>/reviews/",views.product_reviews),
]
