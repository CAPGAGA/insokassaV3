const url_product = 'api/getProduct';
const url_product_by_category = 'api/getProductByCategory/'
const catalog = $(document.getElementById('main-catalog'));

const weights = {
  'XXS':1,
  'XS':2,
  'S':3,
  'M':4,
  'L':5,
  'XL':6,
  'XXL':7,
  'ONE':8,
};

// card constructor for main page
$(document).ready(function(){
    fetch(url_product)
        .then((response) => {
            return response.json();
        })

        .then((data) => {
            let products = data;
            products.map(function(product){
                let card = $(document.createElement('div')).addClass('card'),
                card_image = $(document.createElement('div')).addClass('card-image');
                image = $(document.createElement('img')).attr('src', product.product_image),
                card_info = $(document.createElement('div')).addClass('card-info'),
                strong = $(document.createElement('b')),
                card_title = $(document.createElement('p')).addClass('card-title').text(product.product_name),
                price = $(document.createElement('div')).addClass('price').text(product.product_price + 'руб.' ),
                price_stuff = $(document.createElement('div')).addClass('price-stuff').text('('+product.product_price_stuff+'руб.)'),
                button_group = $(document.createElement('div')).addClass('card-button-group');

//                console.log(checkSizeAvailable(product));
//                console.log(1)
//              sort sizes from API to array XXS -> XXL, ONE
//              only for display
                let size_array = product.size.sort((a,b)=>{
                     if(typeof(a)=="number" && typeof(b)=="number")
                          return a-b;
                     else
                          return weights[a[0]]-weights[b[0]]
                });
//               sort sizes and remove sold out
                for (let [i, size] of Object.entries(size_array)){
//                    size is array of [human readable form e.g XS,XXL, size id in db and size inventory
                    if(size[2] >0){
                    let button = $(document.createElement('div')).addClass('card-button').text(size[0]).attr('data-size', size[1]).attr('data-id', product.id).attr('data-action', 'add');
                    button_group.append(button);
                    }
                }
                strong.append(card_title);
                card_info.append(strong);
                card_info.append(price);
                card_info.append(price_stuff);
                card_image.append(image);
                card.append(card_image);
                card.append(card_info);
                card.append(button_group);
                catalog.append(card);
            })
        })
        .catch(function(error){
            console.log(error);
        })
})

// card constructor by category for main page
$(document).on('click', '.list-button', function(){
    fetch(url_product_by_category.concat($(this).attr('data-id')))
        .then((response) =>{
            return response.json();
        })
        .then((data)=>{
            $('.card').remove();
            $('.list-button').removeClass('active')
            $(this).addClass('active');
            let products = data;
            products.map(function(product){
                let card = $(document.createElement('div')).addClass('card'),
                card_image = $(document.createElement('div')).addClass('card-image');
                image = $(document.createElement('img')).attr('src', product.product_image),
                card_info = $(document.createElement('div')).addClass('card-info'),
                strong = $(document.createElement('b')),
                card_title = $(document.createElement('p')).addClass('card-title').text(product.product_name),
                price = $(document.createElement('div')).addClass('price').text(product.product_price + 'руб.' ),
                price_stuff = $(document.createElement('div')).addClass('price-stuff').text('('+product.product_price_stuff+'руб.)'),
                button_group = $(document.createElement('div')).addClass('card-button-group');


//              sort sizes from API to array XXS -> XXL, ONE
//              only for display
                let size_array = product.size.sort((a,b)=>{
                     if(typeof(a)=="number" && typeof(b)=="number")
                          return a-b;
                     else
                          return weights[a[0]]-weights[b[0]]
                });

                for (let [i, size] of Object.entries(size_array)){
                    if(size[2] >0){
                        let button = $(document.createElement('div')).addClass('card-button').text(size[0]).attr('data-size', size[1]).attr('data-id', product.id).attr('data-action', 'add');
                        button_group.append(button);
                    }
                }

                strong.append(card_title);
                card_info.append(strong);
                card_info.append(price);
                card_info.append(price_stuff);
                card_image.append(image);
                card.append(card_image);
                card.append(card_info);
                card.append(button_group);
                catalog.append(card);
            })
        })
        .catch(function(error){
            console.log(error);
        })

})



