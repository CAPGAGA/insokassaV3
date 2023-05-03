import {populate_order_window} from './populateOrderWindow.js';

const modify_url = 'api/modifyOrder';
const add_url = 'api/addToCart';


//$(document).ready(function(){
//    $('#product_window').each(function(i){
//        console.log(i)
//    })
//
//})

//var getElements = function(selector) {
//    return $(selector);
//  }

// event listener on add/remove cart buttons
// fires up function for adding/removing product from order
// and re-rendering cart
$(document).on('click', '.product-button',function(){
        var productid = $(this).attr('data-product');
        var action = $(this).attr('data-action');
        var size = $(this).attr('data-size');
        var csrftoken = getToken('csrftoken');
//        console.log(productid)
        UpdateUserOrder(productid, action, size, csrftoken);
        $('.product').remove();
        setTimeout(
          function()
          {
          populate_order_window();
          }, 100);
//        location.reload()
})

// function for sending updates of order to backend
function UpdateUserOrder(productid, action, size, csrftoken){
    fetch(modify_url, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'X-CSRFToken': csrftoken,
            },
            body:JSON.stringify({"productid": productid, "action": action, "size": size})
        })

        .then((response) => {
            return response.json();
        })

        .then((data) =>{
            console.log('data', data)

//        location.reload()
        })
        .catch(function(error){
            console.log(error)
        })
    }

// function for adding product to cart from cards
$(document).on('click', '.card-button',function(){
        var productid = $(this).attr('data-id');
        var action = $(this).attr('data-action');
        var size = $(this).attr('data-size');
        var csrftoken = getToken('csrftoken');
        if($('#client-check').prop("checked")){
            var client = 'stuff';
        }
        else{
            var client = 'customer'
        }
//        console.log(productid)
        AddUserOrder(productid, action, size, client, csrftoken);
        $('.product').remove();
        setTimeout(
          function()
          {
          populate_order_window();
          }, 200);
//        populate_order_window();
//        location.reload()
})

// function fro sending updates to db from card buttons
function AddUserOrder(productid, action, size, client, csrftoken){
    fetch(add_url, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'X-CSRFToken': csrftoken,
            },
            body:JSON.stringify({"productid": productid, "action": action, "size": size, 'customer': client})
        })

        .then((response) => {
            return response.json()
        })

        .then((data) =>{
        console.log('data', data)
//        location.reload()
//            let order_item = data;
//            let product = $(document.createElement('div')).addClass('product');
//            $(document.createElement('p')).addClass('name').text(order_item.item.product_name.concat('(',order_item.item.size,')',' ', 'x', ' ', order_item.item.quantity)).appendTo(product);
//            let add_button = $(document.createElement('button')).addClass('product-button').addClass('add').attr('data-action', 'add').attr('data-product', order_item.item.item_id).attr('data-size', order_item.item.product_sizeid).appendTo(product);
//            $(document.createElement('img')).addClass('button-icon').attr('src', "static/icons/plus.svg").appendTo(add_button);
//            let remove_button = $(document.createElement('button')).addClass('product-button').addClass('remove').attr('data-action', 'remove').attr('data-product', order_item.item.item_id).attr('data-size', order_item.item.product_sizeid).appendTo(product);
//            $(document.createElement('img')).addClass('button-icon').attr('src', "static/icons/minus.svg").appendTo(remove_button);
//            product.appendTo(product_window);
        })

        .catch(function(error){
            console.log(error)
        })
    }

export function getToken(name) {
		    var cookieValue = null;
		    if (document.cookie && document.cookie !== '') {
		        var cookies = document.cookie.split(';');
		        for (var i = 0; i < cookies.length; i++) {
		            var cookie = cookies[i].trim();
		            // Does this cookie string begin with the name we want?
		            if (cookie.substring(0, name.length + 1) === (name + '=')) {
		                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		                break;
		            }
		        }
		    }
		    return cookieValue;
		}
