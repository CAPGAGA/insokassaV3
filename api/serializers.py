from rest_framework import serializers
from insokassaV3 import models

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductCategory
        fields = '__all__'

class ProductOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductOwner
        fields = '__all__'

class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductSize
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = '__all__'
        # depth = 1

    # for an api to render actual values and not id of foreign key (like depth = 1)
    def to_representation(self, instance):
        responce = super(ProductSerializer, self).to_representation(instance)
        responce['product_category'] = zip([instance.product_category.category], [instance.product_category.pk])
        # responce['product_category_id'] = instance.product_category.pk
        responce['product_owner'] = instance.product_owner.owner_name
        responce['size'] = zip([size.size for size in instance.size.all()], [size.pk for size in instance.size.all()], [models.ProductVariation.objects.get(product = instance, size = size).amount for size in instance.size.all()]) # as size value is ManyToMany relationship we need to query all of them

        return responce

class ProductVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductVariation
        fields = '__all__'

    def to_representation(self, instance):
        responce = super(ProductVariationSerializer, self).to_representation(instance)
        responce['product_name'] = instance.product.product_name
        responce['price'] = instance.product.product_price
        responce['price_stuff'] = instance.product.product_price_stuff
        responce['owner'] = instance.product.product_owner.owner_name
        responce['category'] = instance.product.product_category.category
        responce['size_human'] = instance.size.size
        return responce

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = '__all__'
        # depth = 1

    def to_representation(self, instance):
        response = super(OrderSerializer, self).to_representation(instance)
        # order, created = models.Order.get_or_create(user = 1 , complete = False)
        # response['items'] = order.items
        # new_list = list()
        # for orderitem in models.Order.items.all():
        #     new_list.append(
        #         {
        #             'orderitemid': orderitem.id,
        #             'quantity': orderitem.quantity,
        #             'product_name': orderitem.product_variation.product.product_name,
        #             'product_size': orderitem.product_variation.size.size,
        #         }
        #     )
        # response['items'] = new_list

        items_list = list()
        for item in instance.items.all():
            item_dict = { 'item': {
                'item_id': item.id, #variant id
                'quantity': models.OrderItem.objects.get(product_variation = item.id, order = instance.id).quantity,
                'product_name': item.product.product_name,
                'product_size': item.size.size,
                'product_sizeid': item.size.id,
                'product_price': item.product.product_price,
                'product_price_stuff': item.product.product_price_stuff,
                }
            }
            items_list.append(item_dict)
        response['items'] = items_list
        # response['items'] = {'variant_id':[item.id for item in instance.items.all()],
        #                      'quantity':[models.OrderItem.objects.get(product_variation = item.id).quantity for item in instance.items.all()],
        #                      'product_name': [item.product.product_name for item in instance.items.all()],
        #                      'product_size':[item.size.size for item in instance.items.all()]
        #                     }
        # [order_item.quantity for order_item in models.OrderItem.objects.all().filter(order=item.id)]
        # response['items'] = ({'orderitemid':models.OrderItem.objects.get(order = instance.id).id,
        #                       'quantity':models.OrderItem.objects.get(order = instance.id).quantity },
        #                      {'product_name':models.OrderItem.objects.get(order = instance.id).product_variation.product.product_name},)
        return response

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderItem
        fields = '__all__'

    def to_representation(self, instance):
        response = super(OrderItemSerializer, self).to_representation(instance)
        response['item_id'] = instance.product_variation.id
        response['quantity'] = instance.quantity
        response['product_name'] = instance.product_variation.product.product_name
        response['size'] = instance.product_variation.size.size
        response['size_id'] = instance.product_variation.size.id


 # "item": {
#                "item_id": 1,
#                "quantity": 11,
#                "product_name": "Test Product 1",
#                "product_size": "XXS",
#                "product_sizeid": 2
#            }