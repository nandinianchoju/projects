from django.contrib import admin
from .models import Category,Product,UserPreference,Cart,CartItem,Wishlist,Order,OrderItem,Review,RecentlyViewed
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display=("name","slug","parent"); search_fields=("name",); prepopulated_fields={"slug":("name",)}
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display=("name","category","price","stock","rating","is_active")
    list_filter=("category","is_active"); search_fields=("name","description")
    list_editable=("price","stock","is_active")
class CartItemInline(admin.TabularInline):
    model=CartItem; extra=0
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display=("id","user","created_at"); inlines=[CartItemInline]
class OrderItemInline(admin.TabularInline):
    model=OrderItem; extra=0; readonly_fields=("product_name","price","quantity")
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display=("order_id","user","total_amount","status","created_at")
    list_filter=("status","created_at"); search_fields=("order_id","user__username"); inlines=[OrderItemInline]
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display=("product","user","rating","created_at"); list_filter=("rating",)
admin.site.register(UserPreference); admin.site.register(CartItem); admin.site.register(Wishlist)
admin.site.register(OrderItem); admin.site.register(RecentlyViewed)
