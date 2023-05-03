import {getToken} from './addProductToOrder.js';

const post_order_url = 'api/postOrder'

// event listener for completing order and sending it to db
$(document).ready(function(){
    $('#sell').click(function(){
        var csrftoken = getToken('csrftoken');
        var transaction_sum = Number($('#income').val()) - Number($('#final_price').data('value'));
        if($('#client-check').prop("checked")){
            var client = 'stuff';
        }
        else{
            var client = 'customer'
        }

        fetch(post_order_url, {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({"transaction_sum": transaction_sum, 'customer': client})
        })

        .then((response)=> {
            return response.json();
        })

        .then((data) => {
            console.log('data', data);
            location.reload();
        })

        .catch(function(error){
            console.log(error)
        })
    })
})