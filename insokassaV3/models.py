from django.db import models
from django.contrib.auth.models import User


class ProductCategory(models.Model):

    category = models.CharField(max_length=64)

    def __str__(self):
        return self.category

class ProductOwner(models.Model):

    owner_name = models.CharField(max_length=64)
    balance = models.IntegerField(default=0)

    def __str__(self):
        return self.owner_name

class ProductSize(models.Model):
    size_choises = (
        ('XXS', 'XXS'),
        ('XS', 'XS'),
        ('S', 'S'),
        ('M', 'M'),
        ('L', 'L'),
        ('XL', 'XL'),
        ('XXL', 'XXL'),
        ('ONE', 'ONE'),
    )

    size = models.CharField(max_length=3, choices=size_choises)

    def __str__(self):
        return self.size

class Product(models.Model):

    product_name = models.CharField(max_length=128)
    product_price = models.IntegerField()
    product_price_stuff = models.IntegerField()
    product_category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE)
    product_owner = models.ForeignKey(ProductOwner, on_delete=models.CASCADE)
    product_image = models.ImageField(upload_to='images', null=True)
    size = models.ManyToManyField('ProductSize', through='ProductVariation')

    def __str__(self):
        return self.product_name


class ProductVariation(models.Model):

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.ForeignKey(ProductSize, on_delete=models.CASCADE)
    amount = models.IntegerField(default=0)
    sold = models.IntegerField(default=0)

    def __str__(self):
        return f'Name: {self.product}, size: {self.size}, amount: {self.amount}'

class Order(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    complete = models.BooleanField()
    time_date = models.DateTimeField(auto_now_add=True)
    items = models.ManyToManyField('ProductVariation', through='OrderItem')

    def __str__(self):
        return str(self.id)


    # Used to output sum of prices for items in cart
    # deprecated
    @property
    def get_cart_total(self):
        itemset = self.orderitem_set.all()
        return sum(item.get_total for item in itemset)

    @property
    def get_cart_stuff_total(self):
        itemset = self.orderitem_set.all()
        return sum(item.get_total_stuff for item in itemset)

    @property
    def get_cart_item_number(self):
        itemset = self.orderitem_set.all()
        return sum(item.quantity for item in itemset)


class OrderItem(models.Model):

    product_variation = models.ForeignKey(ProductVariation, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return f'id: {self.id}, product: {self.product_variation.product}'

    # function get price of each individual position in the cart
    # deprecated
    @property
    def get_total(self):
        return self.product_variation.product.product_price * self.quantity

    @property
    def get_total_stuff(self):
        return self.product_variation.product.product_price_stuff * self.quantity
