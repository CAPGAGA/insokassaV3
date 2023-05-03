export function populate_order_window(){
    const product_window = $('#product_window');
    const order_url = 'api/getLastOrder';
//    constructor for user cart on main page
    fetch(order_url)
        .then((response) => {
            return response.json();
        })

        .then((data) => {
            let orderitems = data;
            var final_price = 0;
            var final_price_stuff = 0;
//            console.log(orderitems)
            orderitems.items.map(function(order_item){
                let product = $(document.createElement('div')).addClass('product');
                $(document.createElement('p')).addClass('name').text(order_item.item.product_name.concat('(',order_item.item.product_size,')',' ', 'x', ' ', order_item.item.quantity)).appendTo(product);
                let add_button = $(document.createElement('button')).addClass('product-button').addClass('add').attr('data-action', 'add').attr('data-product', order_item.item.item_id).attr('data-size', order_item.item.product_sizeid).appendTo(product);
                $(document.createElement('img')).addClass('button-icon').attr('src', "static/icons/plus.svg").appendTo(add_button);
                let remove_button = $(document.createElement('button')).addClass('product-button').addClass('remove').attr('data-action', 'remove').attr('data-product', order_item.item.item_id).attr('data-size', order_item.item.product_sizeid).appendTo(product);
                $(document.createElement('img')).addClass('button-icon').attr('src', "static/icons/minus.svg").appendTo(remove_button);
                product.appendTo(product_window);
                final_price = final_price + (order_item.item.product_price * order_item.item.quantity)
                final_price_stuff = final_price_stuff + (order_item.item.product_price_stuff * order_item.item.quantity)
            });
//            checker for checkbox to see if client from stuff or customer
            if($('#client-check').prop("checked")){
                $('#final_price').text(final_price_stuff.toString().concat(' ', 'руб.'))
                $('#final_price').attr('data-value', final_price_stuff)
            }
            else {
                $('#final_price').text(final_price.toString().concat(' ', 'руб.'))
                $('#final_price').attr('data-value', final_price)
            }

            window.final_price = final_price;
            window.final_price_stuff = final_price_stuff;
        })

}
// click event listener for checkbox
// used to switch prices for stuff and customers
$(document).on('click', '#client-check', function(){
    if($('#client-check').prop("checked")){
        $('#final_price').text(window.final_price_stuff.toString().concat(' ', 'руб.'))
        $('#final_price').attr('data-value', window.final_price_stuff)

    }
    else {
        $('#final_price').text(window.final_price.toString().concat(' ', 'руб.'))
        $('#final_price').attr('data-value', window.final_price)
    }
    $('#final_price').text($('#final_price').attr('data-value') - input_menu.val() + ''.concat(' ', 'руб.'))
})

// init function
$(document).ready(function(){
    populate_order_window();
})
