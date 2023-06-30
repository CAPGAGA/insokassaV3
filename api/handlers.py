from insokassaV3.settings import MEDIA_ROOT

def image_handler(image):
    with open((MEDIA_ROOT+ 'images' + image.name), 'wb+') as destination:
        for chunk in image.chunks():
             destination.write(chunk)