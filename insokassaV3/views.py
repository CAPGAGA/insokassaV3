from django.shortcuts import render

def index(request):
    return render(request, 'base.html', {})

def inventory(request):
    return render(request, 'inventory.html', {})

def game(request):
    return render(request, 'game.html', {})