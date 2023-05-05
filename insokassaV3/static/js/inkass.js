import {getToken} from './addProductToOrder.js';

const owner_url = 'api/getProductOwner'
const page_wrapper = $('.page-wrapper')

$(document).ready(function(){
    let form = $(document.createElement('form')).addClass('form').addClass('inkass'),
        select_owner = $(document.createElement('select')).addClass('input').attr('id','select-owner'),
        p_balance = $(document.createElement('p')).addClass('input').attr('id', 'p-balance'),
        input = $(document.createElement('input')).attr('placeholder', 'Сколько отдаем').attr('class','input').attr('type','number').attr('id', 'input-money'),
        submit = $(document.createElement('button')).text('Отдать').attr('type', 'submit').attr('id', 'submit');

    fetch((owner_url))

    .then((response) => {
        return response.json()
    })

    .then((data) => {
        data.map(function(owner){
            let owner_option = $(document.createElement('option')).attr('value', owner.id).attr('data-balance', owner.balance).text(owner.owner_name);
            select_owner.append(owner_option);
        })
    })
    form.append(select_owner, p_balance, input, submit);
    page_wrapper.append(form)

})

$(document).on('change', '#select-owner', function(){
    console.log($(this).val())
    let opt = $(this).find('option:selected'),
    balance = opt.attr('data-balance');
    console.log(balance)
    $('#p-balance').text(''.concat('Баланс поставщика:', '',balance));
})

$(document).on('click', '#submit', function(e){
    e.preventDefault();
    let owner_id = $('#select-owner').find('option:selected').val(),
    input = $('#input-money').val()
    var csrftoken = getToken('csrftoken');
    fetch(owner_url, {
            method: "PUT",
            headers: {
                'Content-Type':'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({"id": owner_id, "input": input})
        })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    })
})