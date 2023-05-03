from django.urls import path
from . import views

urlpatterns = [
    path('getProductCategory', views.getProductCategory),
    path('getProductOwner', views.getProductOwner),
    path('getProductSize', views.getProductSize),
    path('getProduct', views.getProduct),
    path('getProductByCategory/<str:category>', views.getProductByCategory),
    path('getProductVariation', views.getProductVariation),
    path('getOrder', views.getOrder),
    path('modifyOrder', views.modifyOrder),
    path('addToCart', views.addToCart),
    path('getOrderItem', views.getOrderItem),
    path('getLastOrder', views.getLastOrder),
    path('postOrder', views.postOrder),
    path('addProduct', views.addProduct),
    path('modifyProduct', views.updateProduct),
    path('modifyCategory', views.modifyCategory),
    path('modifyOwner', views.modifyOwner),
    path('modifySize', views.modifySize),
    path('modifyVariant', views.modifyVariant),

]