from django.contrib import admin
from .models import Category, Product, ProductImage, Wishlist, SlideBar, addtoCart

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock', 'is_available')
    list_filter = ('category', 'is_available')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline]

admin.site.register(Category)
admin.site.register(Wishlist)
admin.site.register(SlideBar)
admin.site.register(addtoCart)