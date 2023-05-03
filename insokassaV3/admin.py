from django.contrib import admin
from .models import ProductCategory, ProductOwner, Product, ProductVariation, Order, OrderItem, ProductSize

admin.site.register([ProductCategory, ProductOwner, Product, ProductVariation, Order, OrderItem, ProductSize])