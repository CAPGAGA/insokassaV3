from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import ProductCategorySerializer, ProductOwnerSerializer, ProductSerializer, ProductVariationSerializer, OrderSerializer, OrderItemSerializer, ProductSizeSerializer
from insokassaV3 import models
from django.contrib.auth.models import User
from .handlers import image_handler


# TODO refactor code
# TODO shrink functions and fix routs

@api_view(['GET', 'POST'])
def getProductCategory(request):
    if request.method == 'POST':
        cat_id = request.data['id']

        if cat_id and isinstance(cat_id, str):
            category = models.ProductCategory.objects.get(pk=cat_id)
            serializer = ProductCategorySerializer(category, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        product_category = models.ProductCategory.objects.all()
        serializer = ProductCategorySerializer(product_category, many=True)
        return Response(serializer.data)

@api_view(['POST', 'PUT', 'DELETE'])
def modifyCategory(request):
    if request.method == 'POST':
        cat_id = request.data['id']
        value = request.data['category']

        category = models.ProductCategory.objects.get(pk=cat_id)

        category.category = value
        category.save()
        return Response(status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        value = request.data['category']
        category, created = models.ProductCategory.objects.get_or_create(category=value)
        category.save()
        return Response(status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        cat_id = request.data['id']
        category = models.ProductCategory.objects.get(pk=cat_id)
        category.delete()
        return Response(status=status.HTTP_200_OK)

@api_view(['POST', 'PUT', 'DELETE'])
def modifyOwner(request):
    if request.method == 'POST':
        owner_id = request.data['id']
        value = request.data['owner_name']

        owner = models.ProductOwner.objects.get(pk=owner_id)

        owner.owner_name = value
        owner.save()
        return Response(status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        value = request.data['owner_name']

        owner, created = models.ProductOwner.objects.get_or_create(owner_name = value)

        owner.save()
        return Response(status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        owner_id = request.data['id']
        owner = models.ProductOwner.objects.get(pk=owner_id)
        owner.delete()
        return Response(status=status.HTTP_200_OK)

@api_view(['POST', 'PUT', 'DELETE'])
def modifySize(request):
    if request.method == 'POST':
        size_id = request.data['id']
        value = request.data['size']

        size = models.ProductSize.objects.get(pk=size_id)

        size.size = value
        size.save()
        return Response(status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        value = request.data['size']

        size, created = models.ProductSize.objects.get_or_create(size=value)
        size.save()
        return Response(status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        size_id = request.data['id']
        size = models.ProductSize.objects.get(pk=size_id)
        size.delete()
        return Response(status=status.HTTP_200_OK)

@api_view(['GET', 'POST', 'PUT'])
def getProductOwner(request):
    if request.method == 'POST':
        owner_id = request.data['id']

        if owner_id and isinstance(owner_id, str):
            owner = models.ProductOwner.objects.get(pk=owner_id)
            serializer = ProductOwnerSerializer(owner, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        owner_id = request.data['id']
        money_input = request.data['input']

        owner = models.ProductOwner.objects.get(pk=owner_id)
        owner.balance -= int(money_input)
        owner.save()
        return Response(status=status.HTTP_200_OK)
    else:
        owner_name = models.ProductOwner.objects.all()
        serializer = ProductOwnerSerializer(owner_name, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'POST'])
def getProductSize(request):
    if request.method == 'POST':
        size_id = request.data['id']

        if size_id and isinstance(size_id, str):
            size = models.ProductSize.objects.get(pk=size_id)
            serializer = ProductSizeSerializer(size, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        sizes = models.ProductSize.objects.all()
        serializer = ProductSizeSerializer(sizes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def getProduct(request):
    if request.method == 'POST':
        product_id = request.data['id']

        if product_id:
            product = models.Product.objects.get(pk=product_id)
            serializer = ProductSerializer(product, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        products = models.Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getProductByCategory(request, category):
    # return Response(status=status.HTTP_200_OK)
    products = models.Product.objects.all().filter(product_category = category)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def getProductVariation(request):
    if request.method == 'GET':
        product_variant = models.ProductVariation.objects.all()
        serializer = ProductVariationSerializer(product_variant, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        var_id = request.data['id']
        variant = models.ProductVariation.objects.get(pk=var_id)
        serializer = ProductVariationSerializer(variant, many=False)
        return Response(serializer.data)

@api_view(['GET'])
def getOrder(request):
    oreder = models.Order.objects.all()
    serializer = OrderSerializer(oreder, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getOrderItem(request):
    order_item = models.OrderItem.objects.all()
    serializer = OrderItemSerializer(order_item, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getLastOrder(request):
    user = User.objects.get(pk=1)
    try:
        last_order = models.Order.objects.get(user = user, complete = False)
        serializer = OrderSerializer(last_order, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def modifyOrder(request):
    user = User.objects.get(pk=1)
    order, created = models.Order.objects.get_or_create(user = user, complete = False)
    orderitem, created = models.OrderItem.objects.get_or_create(order=order, product_variation=request.data["productid"])
    if request.data["action"] == 'add':
        orderitem.quantity += 1
        orderitem.save()
        orderitem.product_variation.amount -= 1
        orderitem.product_variation.save()
    elif request.data["action"] == 'remove':
        orderitem.quantity -= 1
        orderitem.save()
        orderitem.product_variation.amount += 1
        orderitem.product_variation.save()

    if orderitem.quantity <=0:
        orderitem.delete()

    responce_dict = {'item': {
        'item_id': orderitem.product_variation.id,
        'quantity': orderitem.quantity,
        'product_name': orderitem.product_variation.product.product_name,
        'product_size': orderitem.product_variation.size.size,
        'size_id': orderitem.product_variation.size.id,
    }}

    return JsonResponse(responce_dict, status=status.HTTP_200_OK)
    # print(request.data)
    # product_id = request.data['productid'] #variant id
    # action = request.data['action']
    # size = request.data['size']
    # user = User.objects.get(pk=1)
    # try:
    #     order, created = models.Order.objects.get_or_create(user = user, complete = False)
    #     orderitem, created = models.OrderItem.objects.get_or_create(order = order, product_variation = product_id)
    #
    #     if action == 'add':
    #         orderitem.quantity += 1
    #         orderitem.save()
    #         orderitem.product_variation.amount -= 1
    #         orderitem.product_variation.save()
    #     elif action == 'remove':
    #         orderitem.quantity -= 1
    #         orderitem.save()
    #         orderitem.product_variation.amount += 1
    #         orderitem.product_variation.save()
    #     return Response(status=status.HTTP_201_CREATED,)
    # except:
    #     return Response(status=status.HTTP_400_BAD_REQUEST,)

@api_view(['POST'])
def addToCart(request):

    user = User.objects.get(pk=1)
    order, created = models.Order.objects.get_or_create(user = user, complete = False)
    product_variant = models.ProductVariation.objects.get(product = request.data['productid'], size = request.data['size'])
    orderitem, created = models.OrderItem.objects.get_or_create(product_variation = product_variant, order = order)
    owner = models.Product.objects.get(pk = request.data['productid']).product_owner

    if request.data["customer"] == "customer":
        if request.data["action"] == 'add':
            orderitem.quantity += 1
            orderitem.save()
            orderitem.product_variation.amount -= 1
            orderitem.product_variation.sold += 1
            orderitem.product_variation.save()
            owner.balance += product_variant.product.product_price
            owner.save()
        elif request.data["action"] == 'remove':
            orderitem.quantity -= 1
            orderitem.save()
            orderitem.product_variation.amount += 1
            orderitem.product_variation.sold -= 1
            orderitem.product_variation.save()
            owner.balance -= product_variant.product.product_price
            owner.save()
        response_dict = {'item':{
                                'item_id': orderitem.product_variation.id,
                                'quantity': orderitem.quantity,
                                'product_name': orderitem.product_variation.product.product_name,
                                'size': orderitem.product_variation.size.size,
                                'size_id': orderitem.product_variation.size.id,
                            }}

        return JsonResponse(response_dict, status = status.HTTP_200_OK)
    elif request.data['customer'] == 'stuff':
        if request.data["action"] == 'add':
            orderitem.quantity += 1
            orderitem.save()
            orderitem.product_variation.amount -= 1
            orderitem.product_variation.sold += 1
            orderitem.product_variation.save()
            owner.balance += product_variant.product.product_price_stuff
            owner.save()
        elif request.data["action"] == 'remove':
            orderitem.quantity -= 1
            orderitem.save()
            orderitem.product_variation.amount += 1
            orderitem.product_variation.sold -= 1
            orderitem.product_variation.save()
            owner.balance -= product_variant.product.product_price_stuff
            owner.save()
        response_dict = {'item': {
            'item_id': orderitem.product_variation.id,
            'quantity': orderitem.quantity,
            'product_name': orderitem.product_variation.product.product_name,
            'size': orderitem.product_variation.size.size,
            'size_id': orderitem.product_variation.size.id,
        }}

        return JsonResponse(response_dict, status=status.HTTP_200_OK)


@api_view(['POST'])
def postOrder(request):
    user = User.objects.get(pk=1)
    order = models.Order.objects.get(user=user, complete = False)
    if request.data['transaction_sum'] >= 0:
        order.complete = True
        order.save()
        return Response(data='Success' ,status=status.HTTP_200_OK)
    else:
        return Response(data='Transaction must be more then or equal to 0', status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def addProduct(request):

    name = request.data['name']
    price = request.data['price']
    price_stuff = request.data['price_stuff']
    category = request.data['category']
    owner = request.data['owner']
    image = request.FILES.getlist('image', None)

    print(name, price, price_stuff, category, owner, image[0].name)

    product, created = models.Product.objects.get_or_create(product_name=name,
                                                            product_price=price,
                                                            product_price_stuff=price_stuff,
                                                            product_category=models.ProductCategory.objects.get(pk=category),
                                                            product_owner=models.ProductOwner.objects.get(pk=owner),
                                                            product_image='images/' + image[0].name,
                                                            )
    for f in image:
        image_handler(f)
    return Response('got it', status=status.HTTP_200_OK)

@api_view(['POST', 'DELETE'])
def updateProduct(request):
    if request.method == 'POST':
        prod_id = request.data['prod_id']
        name = request.data['name']
        price = request.data['price']
        price_stuff = request.data['price_stuff']
        category = request.data['category']
        owner = request.data['owner']
        image = request.FILES.getlist('image', None)
        image_old = request.data['image_old']

        product, created = models.Product.objects.get_or_create(pk=prod_id)
        print(len(image))
        if price != product.product_price and price is not None:
            product.product_price = price
        if price_stuff != product.product_price_stuff and price_stuff is not None:
            product.product_price_stuff = price_stuff
        if models.ProductCategory.objects.get(pk = category) != product.product_category and category is not None:
            product.product_category = models.ProductCategory.objects.get(pk = category)
        if models.ProductOwner.objects.get(pk = owner) != product.product_owner and owner is not None:
            product.product_owner = models.ProductOwner.objects.get(pk = owner)
        if len(image)==1:
            if image[0].name != image_old:
                product.product_image = 'images/' + image[0].name
        product.save()

        if len(image)==1:
            if image[0].name != image_old:
                for f in image:
                    image_handler(f)
        return Response('got it', status=status.HTTP_200_OK)
    elif request.method == 'DELETE':

        prod_id = request.data['id']

        product = models.Product.objects.get(pk=prod_id)

        product.delete()
        return Response(status=status.HTTP_200_OK)

# response = super(OrderItemSerializer, self).to_representation(instance)
#         response['item_id'] = instance.product_variation.id
#         response['quantity'] = instance.quantity
#         response['product_name'] = instance.product_variation.product.product_name
#         response['size'] = instance.product_variation.size.size
#         response['size_id'] = instance.product_variation.size.id

@api_view(['POST', 'PUT', 'DELETE'])
def modifyVariant(request):
    if request.method == 'POST':
        product_id = request.data['product']
        size_id = request.data['size']
        inventory = request.data['inventory']
        product = models.Product.objects.get(pk=product_id)
        size = models.ProductSize.objects.get(pk=size_id)
        variant, created = models.ProductVariation.objects.get_or_create(product = product, size=size)
        variant.amount = inventory
        variant.save()
        return Response(status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        var_id = request.data['id']
        variant = models.ProductVariation.objects.get(pk=var_id)
        variant.delete()
        return Response(status=status.HTTP_200_OK)