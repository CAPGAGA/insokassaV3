// TODO refactor code
// leave all hope one entering


import {getToken} from './addProductToOrder.js';

const variants_url = 'api/getProductVariation'
const table = $(".info-table")
const category_url = 'api/getProductCategory'
const owners_url = 'api/getProductOwner'
const sizes_url = 'api/getProductSize'
const products_url = 'api/getProduct'
const add_product_url = 'api/addProduct'
const update_product_url = 'api/modifyProduct'
const modify_variant_url = 'api/modifyVariant'

// event listener and renderer of inventory sum up information
$('#render-inventory').click(function(){
    fetch(variants_url)
        .then((response) => {
            return response.json()
        })

        .then((data) =>{
            $('.working-wrapper').remove();
            let products = data;
            $('.info-table').remove();
            let table = $(document.createElement('table')).addClass('info-table'),
            head = $(document.createElement('tr')),
            name = $(document.createElement('th')).text('Название'),
            price = $(document.createElement('th')).text('Цена (гости/наши)'),
            category = $(document.createElement('th')).text('Категория'),
            owner = $(document.createElement('th')).text('Владелец'),
            size = $(document.createElement('th')).text('Размер'),
            inventory = $(document.createElement('th')).text('Наличие'),
            sold = $(document.createElement('th')).text('Продано');

            head.append(name,price,category,owner,size,inventory,sold);
            table.append(head);
            $('body').append(table);

            products.map(function(product){

                let row_name = $(document.createElement('td')).text(product.product_name),
                row_price = $(document.createElement('td')).text(''.concat(product.price,'/',product.price_stuff)),
                row_category = $(document.createElement('td')).text(product.category),
                row_owner = $(document.createElement('td')).text(product.owner),
                row_size = $(document.createElement('td')).text(product.size_human),
                row_inventory = $(document.createElement('td')).text(product.amount),
                row_sold = $(document.createElement('td')).text(product.sold);
//                modify_button = $(document.createElement('button')).text('Редактировать').attr('data-product', product.id).attr('data-size', product.size),
//                button_wrapper = $(document.createElement('td')).append(modify_button);

                table.append($(document.createElement('tr')).append(row_name, row_price, row_category, row_owner, row_size, row_inventory, row_sold))
            })
        })

        .catch((error) => {
            console.log(error)
        })
})
// event listener for constructing setting panel for inventory
$("#inventory-settings").click(function(){
    $('.info-table').remove();
    let working_wrapper = $(document.createElement('div')).addClass('working-wrapper'),
    working_panel = $(document.createElement('div')).addClass('working-panel'),
    items_table = $(document.createElement('table')).addClass('items-table'),
//    category row
    models_list = $(document.createElement('table')).addClass('models-list'),
    tr_cal = $(document.createElement('tr')),
    td_cal = $(document.createElement('td')),
    button_cal = $(document.createElement('button')).attr('id', 'category').addClass('models-button').text('Категории'),
    td_cal_add = $(document.createElement('td')),
    button_add_cal = $(document.createElement('button')).attr('id','add-category').addClass('plus-button'),
    button_add_img_cal = $(document.createElement('img')).attr('src', 'static/icons/plus-big.svg');

    button_add_cal.append(button_add_img_cal);
    td_cal.append(button_cal);
    td_cal_add.append(button_add_cal);

    tr_cal.append(td_cal, td_cal_add);

//    owner row
    let tr_own = $(document.createElement('tr')),
    td_own = $(document.createElement('td')),
    button_own = $(document.createElement('button')).attr('id', 'owners').addClass('models-button').text('Поставщики'),
    td_own_add = $(document.createElement('td')),
    button_add_own = $(document.createElement('button')).attr('id','add-owner').addClass('plus-button'),
    button_add_img_own = $(document.createElement('img')).attr('src', 'static/icons/plus-big.svg');

    button_add_own.append(button_add_img_own);
    td_own.append(button_own);
    td_own_add.append(button_add_own);

    tr_own.append(td_own, td_own_add);

//    size row
    let tr_size = $(document.createElement('tr')),
    td_size = $(document.createElement('td')),
    button_size = $(document.createElement('button')).attr('id', 'sizes').addClass('models-button').text('Размеры'),
    td_size_add = $(document.createElement('td')),
    button_add_size = $(document.createElement('button')).attr('id','add-size').addClass('plus-button'),
    button_add_img_size = $(document.createElement('img')).attr('src', 'static/icons/plus-big.svg');

    button_add_size.append(button_add_img_size);
    td_size.append(button_size);
    td_size_add.append(button_add_size);

    tr_size.append(td_size, td_size_add);

//    products row
    let tr_prod = $(document.createElement('tr')),
    td_prod = $(document.createElement('td')),
    button_prod = $(document.createElement('button')).attr('id', 'products').addClass('models-button').text('Продукты'),
    td_prod_add = $(document.createElement('td')),
    button_add_prod = $(document.createElement('button')).attr('id','add-product').addClass('plus-button'),
    button_add_img_prod = $(document.createElement('img')).attr('src', 'static/icons/plus-big.svg');

    button_add_prod.append(button_add_img_prod);
    td_prod.append(button_prod);
    td_prod_add.append(button_add_prod);

    tr_prod.append(td_prod, td_prod_add);

//  variant row

    let tr_var = $(document.createElement('tr')),
    td_var = $(document.createElement('td')),
    button_var = $(document.createElement('button')).attr('id', 'variants').addClass('models-button').text('Варианты'),
    td_var_add = $(document.createElement('td')),
    button_add_var = $(document.createElement('button')).attr('id','add-variant').addClass('plus-button'),
    button_add_img_var = $(document.createElement('img')).attr('src', 'static/icons/plus-big.svg');

    button_add_var.append(button_add_img_var);
    td_var.append(button_var);
    td_var_add.append(button_add_var);

    tr_var.append(td_var, td_var_add);


    models_list.append(tr_cal, tr_own, tr_size, tr_prod, tr_var);
    working_panel.append(items_table);
    working_wrapper.append(models_list, working_panel);

    $('body').append(working_wrapper)
})

// event listener and constructor of category tab
$(document).on("click", "#category", function(){
    $('.info-table').remove();
    $('.form').remove();
    fetch(category_url)
        .then((response) => {
            return response.json();
        })

        .then((data) => {
            let category = data;
            $(".items-table tr").remove();
            category.map(function(category){
                let table = $('.items-table'),
                table_row = $(document.createElement('tr')),
                first = $(document.createElement('td')).text(category.category),
//                add_button_wrapper = $(document.createElement('td')),
//                add_button = $(document.createElement('img')).attr('src', "static/icons/plus-big.svg").attr('data-model', 'category').attr('data-id', category.id);
                modify_button_wrapper = $(document.createElement('td')),
                modify_button = $(document.createElement('img')).attr('src', "static/icons/wrench.svg").attr('data-model', 'category').attr('data-id', category.id).addClass('mod-img');

//                add_button_wrapper.append(add_button);
                modify_button_wrapper.append(modify_button);
                table_row.append(first,modify_button_wrapper);
                table.append(table_row);
            })
        })
        .catch((error) =>{
            console.log(error)
        })

})

// event listener and constructor of owners tab
$(document).on('click', '#owners', function(){
    $('.info-table').remove();
    $('.form').remove();
    fetch(owners_url)
        .then((response) => {
            return response.json();
        })

        .then((data) => {
            let owners = data;
            $(".items-table tr").remove();
            owners.map(function(owner){
                let table = $('.items-table'),
                table_row = $(document.createElement('tr')),
                first = $(document.createElement('td')).text(owner.owner_name),
//                add_button_wrapper = $(document.createElement('td')),
//                add_button = $(document.createElement('img')).attr('src', "static/icons/plus-big.svg").attr('data-model', 'category').attr('data-id', category.id);
                modify_button_wrapper = $(document.createElement('td')),
                modify_button = $(document.createElement('img')).attr('src', "static/icons/wrench.svg").attr('data-model', 'owner').attr('data-id', owner.id).addClass('mod-img');

//                add_button_wrapper.append(add_button);
                modify_button_wrapper.append(modify_button);
                table_row.append(first,modify_button_wrapper);
                table.append(table_row);
            })
        })
        .catch((error) =>{
            console.log(error)
        })

})

// event listener and constructor of sizes tab
$(document).on('click', '#sizes', function(){
    $('.info-table').remove();
    $('.form').remove();
    fetch(sizes_url)
        .then((response) => {
            return response.json();
        })

        .then((data) => {
            let sizes = data;
            $(".items-table tr").remove();
            sizes.map(function(size){
                let table = $('.items-table'),
                table_row = $(document.createElement('tr')),
                first = $(document.createElement('td')).text(size.size),
//                add_button_wrapper = $(document.createElement('td')),
//                add_button = $(document.createElement('img')).attr('src', "static/icons/plus-big.svg").attr('data-model', 'category').attr('data-id', category.id);
                modify_button_wrapper = $(document.createElement('td')),
                modify_button = $(document.createElement('img')).attr('src', "static/icons/wrench.svg").attr('data-model', 'size').attr('data-id', size.id).addClass('mod-img');

//                add_button_wrapper.append(add_button);
                modify_button_wrapper.append(modify_button);
                table_row.append(first,modify_button_wrapper);
                table.append(table_row);
            })
        })
        .catch((error) =>{
            console.log(error)
        })

})

// event listener and constructor of products tab
$(document).on('click', '#products', function(){
    $('.info-table').remove();
    $('.form').remove();
    fetch(products_url)
        .then((response) => {
            return response.json();
        })

        .then((data) => {
            let products = data;
            $(".items-table tr").remove();
            products.map(function(product){
                let table = $('.items-table'),
                table_row = $(document.createElement('tr')),
                first = $(document.createElement('td')).text(product.product_name),
//                add_button_wrapper = $(document.createElement('td')),
//                add_button = $(document.createElement('img')).attr('src', "static/icons/plus-big.svg").attr('data-model', 'category').attr('data-id', category.id);
                modify_button_wrapper = $(document.createElement('td')),
                modify_button = $(document.createElement('img')).attr('src', "static/icons/wrench.svg").attr('data-model', 'product').attr('data-id', product.id).addClass('mod-img');

//                add_button_wrapper.append(add_button);
                modify_button_wrapper.append(modify_button);
                table_row.append(first,modify_button_wrapper);
                table.append(table_row);
            })
        })
        .catch((error) =>{
            console.log(error)
        })

})

// event listener and constructor of variants tab
$(document).on('click', '#variants', function(){
    $('.info-table').remove();
    $('.form').remove();
    fetch(variants_url)
        .then((response) => {
            return response.json();
        })

        .then((data) => {
            let variants = data;
            $(".items-table tr").remove();
            variants.map(function(variant){
                let table = $('.items-table'),
                table_row = $(document.createElement('tr')),
                first = $(document.createElement('td')).text(''.concat(variant.product_name,' ','-',' ', variant.size_human)),
//                add_button_wrapper = $(document.createElement('td')),
//                add_button = $(document.createElement('img')).attr('src', "static/icons/plus-big.svg").attr('data-model', 'category').attr('data-id', category.id);
                modify_button_wrapper = $(document.createElement('td')),
                modify_button = $(document.createElement('img')).attr('src', "static/icons/wrench.svg").attr('data-model', 'variant').attr('data-id', variant.id).addClass('mod-img');

//                add_button_wrapper.append(add_button);
                modify_button_wrapper.append(modify_button);
                table_row.append(first,modify_button_wrapper);
                table.append(table_row);
            })
        })
        .catch((error) =>{
            console.log(error)
        })

})

// event listener for button for constructing form of adding new category
$(document).on('click', '#add-category', function(){
    $(".items-table tr").remove();
    renderForm('category');
})

// event listener for button for constructing form of adding new owner
$(document).on('click', '#add-owner', function(){
    $(".items-table tr").remove();
    renderForm('owner');
})

// event listener for button for constructing form of adding new size
$(document).on('click', '#add-size', function(){
    $(".items-table tr").remove();
    renderForm('size');
})

// event listener for button for constructing form of adding new product
$(document).on('click', '#add-product', function(){
    $(".items-table tr").remove();
    renderForm('product');
})

// event listener for button for constructing form of adding new variant
$(document).on('click', '#add-variant', function(){
    $(".items-table tr").remove();
    renderForm('variant');
})

// event listener for button for constructing form for modifying instance
// of desired table

$(document).on('click', '.mod-img', function(){
    console.log('click');
    renderPopulatedForm($(this).attr("data-model"), $(this).attr("data-id"));
})

// constructor of forms for adding new instances into desired table
function renderForm(formName){
    $('.form').remove();

    let form = $(document.createElement('form')).addClass('form')
    if(formName == 'category'){
        let input  = $(document.createElement('input')).attr('placeholder', 'Категория').attr('class','input').attr('type','text').attr('id', 'input-category'),
        submit = $(document.createElement('button')).text('Добавить').attr('type', 'submit').attr('class', 'input').attr('data-model', 'category').attr('id', 'new-category');

        form.append(input, submit);
        $('.working-panel').append(form);
    }
    else if(formName == 'owner'){
        let input  = $(document.createElement('input')).attr('placeholder', 'Поставщик').attr('class','input').attr('type','text').attr('id', 'input-owner'),
        submit = $(document.createElement('button')).text('Добавить').attr('type', 'submit').attr('class', 'input').attr('data-model', 'owner').attr('id', 'new-owner');
        form.append(input, submit);
        $('.working-panel').append(form);
    }
    else if(formName == 'size'){
        let input  = $(document.createElement('input')).attr('placeholder', 'Размер').attr('class','input').attr('type','text').attr('id', 'input-size'),
        submit = $(document.createElement('button')).text('Добавить').attr('type', 'submit').attr('class', 'input').attr('data-model', 'size').attr('id', 'new-size');
        form.append(input, submit);
        $('.working-panel').append(form);
    }
    else if(formName == 'product'){
        let input_name  = $(document.createElement('input')).attr('placeholder', 'Название товара').attr('class','input').attr('type','text').attr('id', 'prod-name'),
        input_price  = $(document.createElement('input')).attr('placeholder', 'Цена для гостей').attr('class','input').attr('type','text').attr('id', 'prod-price'),
        input_price_stuff  = $(document.createElement('input')).attr('placeholder', 'Цена для своих').attr('class','input').attr('type','text').attr('id', 'prod-price-stuff'),
        select_category = $(document.createElement('select')).addClass('input').attr('id', 'prod-category'),
        select_owner = $(document.createElement('select')).addClass('input').attr('id', 'prod-owner'),
        select_category_placeholder = $(document.createElement('option')).prop("disabled", true).prop('selected', true).hide().text('Категория'),
        select_owner_placeholder = $(document.createElement('option')).prop("disabled", true).prop('selected', true).hide().text('Поставщик'),
        input_image = $(document.createElement('input')).attr('type', 'file').addClass('input').attr('id', 'prod-image'),
//        radio_group = $(document.createElement('div')).addClass('radio-group')
        submit = $(document.createElement('button')).text('Добавить').attr('type', 'submit').attr('class', 'input').attr('data-model', 'product').attr('id','add-new-product-form');

        fetch(category_url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let categories = data;

                categories.map(function(category){
                    let category_option = $(document.createElement('option')).attr('value', category.id).text(category.category);
                    select_category.append(category_option)
                });
            })

            .catch(function(error){
                console.log(error);
            })

        fetch(owners_url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let owners = data;

                owners.map(function(owner){
                    let owner_option = $(document.createElement('option')).attr('value', owner.id).text(owner.owner_name);
                    select_owner.append(owner_option)
                });
            })

            .catch(function(error){
                console.log(error);
            })

        fetch(sizes_url)
            .then((response) => {

            })

        select_category.append(select_category_placeholder);
        select_owner.append(select_owner_placeholder);
        form.append(input_name, input_price, input_price_stuff, select_category, select_owner, input_image, submit);
        $('.working-panel').append(form);
    }
    else if(formName == 'variant'){
        let select_product = $(document.createElement('select')).addClass('input').attr('id', 'var-product'),
        select_product_placeholder = $(document.createElement('option')).prop("disabled", true).prop('selected', true).hide().text('Продукт'),
        select_size = $(document.createElement('select')).addClass('input').attr('id', 'var-size'),
        select_size_placeholder = $(document.createElement('option')).prop("disabled", true).prop('selected', true).hide().text('Размер'),
        inventory = $(document.createElement('input')).attr('placeholder', 'Количество').attr('class','input').attr('type','text').attr('id', 'input-inventory'),
        submit = $(document.createElement('button')).text('Добавить').attr('type', 'submit').attr('class', 'input').attr('data-model', 'size').attr('id', 'new-variant');

        select_product.append(select_product_placeholder);
        select_size.append(select_size_placeholder);

        fetch(products_url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let products = data;

                products.map(function(product){
                    let product_option = $(document.createElement('option')).attr('value', product.id).text(product.product_name);
                    select_product.append(product_option)
                });
            })

            .catch(function(error){
                console.log(error);
            })

        fetch(sizes_url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let sizes = data;

                sizes.map(function(size){
                    let size_option = $(document.createElement('option')).attr('value', size.id).text(size.size);
                    select_size.append(size_option)
                });
            })

            .catch(function(error){
                console.log(error);
            })

        form.append(select_product, select_size, inventory, submit);
        $('.working-panel').append(form);

    }

}

// constructor of forms for modifying existences instances of desired table
function renderPopulatedForm(formName, id){
    $('.form').remove();
    var csrftoken = getToken('csrftoken');
    let form = $(document.createElement('form')).addClass('form');
    if(formName == 'category'){
        fetch(category_url, {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({"id": id})
        })

        .then((response) => {
            return response.json();
        })

        .then((data) => {
            let input  = $(document.createElement('input')).attr('placeholder', 'Категория').attr('class','input').attr('type','text').val(data.category).attr('id', 'input-category'),
            submit = $(document.createElement('button')).text('Добавить').attr('type', 'submit').attr('class', 'input').attr('data-model', 'category').attr('data-id', data.id).attr('id','modify-category'),
            deleteBtn = $(document.createElement('button')).text('УДАЛИТЬ').attr('type', 'submit').attr('class', 'input').attr('data-model', 'category').attr('data-id', data.id).attr('id', 'delete-category');
            form.append(input, submit, deleteBtn);
            $('.working-panel').append(form);
        })

        .catch(function(error){
            console.log(error)
        })
    }
    else if(formName == 'owner'){
        fetch(owners_url, {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({"id": id})
        })

        .then((response) => {
            return response.json();
        })

        .then((data) => {
            let input  = $(document.createElement('input')).attr('placeholder', 'Поставщик').attr('class','input').attr('type','text').val(data.owner_name).attr('id', 'input-owner'),
            submit = $(document.createElement('button')).text('Добавить').attr('type', 'submit').attr('class', 'input').attr('data-model', 'owner').attr('data-id', data.id).attr('id','modify-owner'),
            deleteBtn = $(document.createElement('button')).text('УДАЛИТЬ').attr('type', 'submit').attr('class', 'input').attr('data-model', 'owner').attr('data-id', data.id).attr('id', 'delete-owner');
            form.append(input, submit, deleteBtn);
            $('.working-panel').append(form);
        })

        .catch(function(error){
            console.log(error)
        })
    }
    else if(formName == 'size'){
        fetch(sizes_url, {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({"id": id})
        })

        .then((response) => {
            return response.json();
        })

        .then((data) => {
            let input  = $(document.createElement('input')).attr('placeholder', 'Размер').attr('class','input').attr('type','text').val(data.size).attr('id', 'input-size'),
            submit = $(document.createElement('button')).text('Добавить').attr('type', 'submit').attr('class', 'input').attr('data-model', 'size').attr('data-id', data.id).attr('id','modify-size'),
            deleteBtn = $(document.createElement('button')).text('УДАЛИТЬ').attr('type', 'submit').attr('class', 'input').attr('data-model', 'size').attr('data-id', data.id).attr('id', 'delete-size');
            form.append(input, submit, deleteBtn);
            $('.working-panel').append(form);
        })

        .catch(function(error){
            console.log(error)
        })
    }
    else if(formName == 'product')
        fetch(products_url, {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({"id": id})
        })
        .then((response) =>{
            return response.json();
        })
        .then((data) => {
            let input_name  = $(document.createElement('input')).attr('placeholder', 'Название товара').attr('class','input').attr('type','text').attr('id', 'prod-name').val(data.product_name),
            input_price  = $(document.createElement('input')).attr('placeholder', 'Цена для гостей').attr('class','input').attr('type','text').attr('id', 'prod-price').val(data.product_price),
            input_price_stuff  = $(document.createElement('input')).attr('placeholder', 'Цена для своих').attr('class','input').attr('type','text').attr('id', 'prod-price-stuff').val(data.product_price_stuff),
            select_category = $(document.createElement('select')).addClass('input').attr('id', 'prod-category').val(data.product_category[0][0]),
            select_owner = $(document.createElement('select')).addClass('input').attr('id', 'prod-owner').val(data.product_owner),
//            select_category_placeholder = $(document.createElement('option')).prop("disabled", true).prop('selected', true).hide().text(data.product_category[0][0]),
//            select_owner_placeholder = $(document.createElement('option')).prop("disabled", true).prop('selected', true).hide().text(data.product_owner),
            input_image = $(document.createElement('input')).attr('type', 'file').addClass('input').attr('id', 'prod-image'),
            image_placeholder = $(document.createElement('img')).attr('src', data.product_image).addClass('input').attr('id', 'prod-image-old'),
            submit = $(document.createElement('button')).text('Добавить').attr('class', 'input').attr('data-model', 'product').attr('id','add-product-form').attr('data-id',id),
            deleteBtn = $(document.createElement('button')).text('УДАЛИТЬ').attr('type', 'submit').attr('class', 'input').attr('data-model', 'product').attr('data-id', id).attr('id', 'delete-product');

            fetch(category_url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let categories = data;

                categories.map(function(category){
                    let category_option = $(document.createElement('option')).attr('value', category.id).text(category.category);
                    select_category.append(category_option)
                });
            })

            .catch(function(error){
                console.log(error);
            })

            fetch(owners_url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let owners = data;

                    owners.map(function(owner){
                        let owner_option = $(document.createElement('option')).attr('value', owner.id).text(owner.owner_name);
                        select_owner.append(owner_option)
                    });
                })

                .catch(function(error){
                    console.log(error);
                })

//            select_category.append(select_category_placeholder);
//            select_owner.append(select_owner_placeholder);
            form.append(input_name, input_price, input_price_stuff, select_category, select_owner, input_image, image_placeholder, submit, deleteBtn);
            $('.working-panel').append(form);

        })
    else if(formName == 'variant'){
        fetch(variants_url, {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({"id": id})
        })

        .then((response) => {
            return response.json();
        })

        .then((data) => {
            let select_product = $(document.createElement('select')).addClass('input').attr('id', 'var-product').val(data.product_name),
//            select_product_placeholder = $(document.createElement('option')).prop("disabled", true).prop('selected', true).hide().text('Продукт'),
            select_size = $(document.createElement('select')).addClass('input').attr('id', 'var-size').val(data.size_human),
//            select_size_placeholder = $(document.createElement('option')).prop("disabled", true).prop('selected', true).hide().text('Размер'),
            inventory = $(document.createElement('input')).attr('placeholder', 'Количество').attr('class','input').attr('type','text').attr('id', 'input-inventory').val(data.amount),
            submit = $(document.createElement('button')).text('Добавить').attr('type', 'submit').attr('class', 'input').attr('data-model', 'size').attr('id', 'new-variant'),
            deleteBtn = $(document.createElement('button')).text('УДАЛИТЬ').attr('type', 'submit').attr('class', 'input').attr('data-model', 'variant').attr('data-id', id).attr('id', 'delete-variant');

            fetch(products_url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let products = data;

                products.map(function(product){
                    let product_option = $(document.createElement('option')).attr('value', product.id).text(product.product_name);
                    select_product.append(product_option)
                });
            })

            .catch(function(error){
                console.log(error);
            })

        fetch(sizes_url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let sizes = data;

                sizes.map(function(size){
                    let size_option = $(document.createElement('option')).attr('value', size.id).text(size.size);
                    select_size.append(size_option)
                });
            })

            .catch(function(error){
                console.log(error);
            })

        form.append(select_product, select_size, inventory, submit, deleteBtn);
        $('.working-panel').append(form);
        })


    }
}

// as product is more complicated instance it uses this function for signals to backend
function sendProduct(name, price, price_stuff, category, owner, image){
    var csrftoken = getToken('csrftoken');
    var form_data = new FormData();

    form_data.append('name', name);
    form_data.append('price', price);
    form_data.append('price_stuff', price_stuff);
    form_data.append('category', category);
    form_data.append('owner', owner);
    form_data.append('image', image);
    form_data.append("csrfmiddlewaretoken", csrftoken);

    console.log(form_data)
    $.ajax({
        url: add_product_url,
        dataType: 'json', // what to expect back from server
        cache: false,
        contentType: false,
        processData: false,
        //data: {'data': form_data, 'csrfmiddlewaretoken': csrf_token},
        data: form_data,
        type: 'post',
        success: function (response) { // display success response
            console.log(response)
        },
        error: function (response) {
            console.log(response); // display error response
        }
					});
}

// event listener for submit button of product from
// fires up function for sending form to backend
$(document).on('click', '#add-new-product-form', function(e){
    e.preventDefault();
    let name = $('#prod-name').val(),
    price = $('#prod-price').val(),
    price_stuff = $('#prod-price-stuff').val(),
    category = $('#prod-category').val(),
    owner = $('#prod-owner').val(),
    image = $('#prod-image')[0].files[0];

    sendProduct(name, price, price_stuff, category, owner, image)

})

// function for modifying extent product instance
function modifyProduct(id, name, price, price_stuff, category, owner, image, image_old){
    var csrftoken = getToken('csrftoken');
    var form_data = new FormData();

    form_data.append('prod_id', id);
    form_data.append('name', name);
    form_data.append('price', price);
    form_data.append('price_stuff', price_stuff);
    form_data.append('category', category);
    form_data.append('owner', owner);
    form_data.append('image', image);
    form_data.append('image_old', image_old)
    form_data.append("csrfmiddlewaretoken", csrftoken);

    console.log(form_data)
    $.ajax({
        url: update_product_url,
        dataType: 'json', // what to expect back from server
        cache: false,
        contentType: false,
        processData: false,
        //data: {'data': form_data, 'csrfmiddlewaretoken': csrf_token},
        data: form_data,
        type: 'post',
        success: function (response) { // display success response
            console.log(response)
        },
        error: function (response) {
            console.log(response); // display error response
        }
					});
}



$(document).on('click', '#add-product-form', function(e){
    e.preventDefault();
    let id = $(this).attr('data-id'),
    name = $('#prod-name').val(),
    price = $('#prod-price').val(),
    price_stuff = $('#prod-price-stuff').val(),
    category = $('#prod-category').val(),
    owner = $('#prod-owner').val(),
    image = $('#prod-image')[0].files[0];
    image_old = $('#prod-image-old').attr('src')

    modifyProduct(id, name, price, price_stuff, category, owner, image, image_old)

})

$(document).on('click', '#modify-category', function(e){
    e.preventDefault();
    let cat_id = $(this).attr('data-id'),
    model = $(this).attr('data-model'),
    value = $('#input-category').val();

    modifyModel(model, cat_id, value);

})

$(document).on('click', '#modify-owner', function(e){
    e.preventDefault();
    let owner_id = $(this).attr('data-id'),
    model = $(this).attr('data-model'),
    value = $('#input-owner').val();

    modifyModel(model, owner_id, value);
})

$(document).on('click', '#modify-size', function(e){
    e.preventDefault();
    let size_id = $(this).attr('data-id'),
    model = $(this).attr('data-model'),
    value = $('#input-size').val();

    modifyModel(model, size_id, value);
})

function modifyModel(model, id, value){
    var csrftoken = getToken('csrftoken');
    if(model=='category'){
        console.log('category')
        fetch('api/modifyCategory', {
                method: "POST",
                headers: {
                    'Content-Type':'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({"id": id, 'category': value})
            })
    }
    else if(model=='owner'){
        fetch('api/modifyOwner', {
                method: "POST",
                headers: {
                    'Content-Type':'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({"id": id, 'owner_name': value})
            })
    }
    else if(model=='size'){
        fetch('api/modifySize', {
                method: "POST",
                headers: {
                    'Content-Type':'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({"id": id, 'size': value})
            })
    }

}
$(document).on('click', '#new-category', function(e){
    e.preventDefault();
    let model = $(this).attr('data-model'),
    value = $('#input-category').val()

    addNewModel(model, value);
})

$(document).on('click', '#new-owner', function(e){
    e.preventDefault();
    let model = $(this).attr('data-model'),
    value = $('#input-owner').val()

    addNewModel(model, value);
})

$(document).on('click', '#new-size', function(e){
    e.preventDefault();
    let model = $(this).attr('data-model'),
    value = $('#input-size').val()

    addNewModel(model, value);
})

$(document).on('click', '#new-variant', function(e){
    e.preventDefault();
    let model = $(this).attr('data-model'),
    product = $('#var-product').val(),
    size = $('#var-size').val(),
    inventory = $('#input-inventory').val()
    sendVariant(product, size, inventory);
})

function sendVariant(product, size, inventory){
    var csrftoken = getToken('csrftoken');
    fetch(modify_variant_url, {
                method: "POST",
                headers: {
                    'Content-Type':'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({"product": product, 'size': size, 'inventory': inventory})
            })
}

function addNewModel(model, value){
    var csrftoken = getToken('csrftoken');
    if(model=='category'){
        console.log('category')
        fetch('api/modifyCategory', {
                method: "PUT",
                headers: {
                    'Content-Type':'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({'category': value})
            })
    }
    else if(model=='owner'){
        fetch('api/modifyOwner', {
                method: "PUT",
                headers: {
                    'Content-Type':'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({'owner_name': value})
            })
    }
    else if(model=='size'){
        fetch('api/modifySize', {
                method: "PUT",
                headers: {
                    'Content-Type':'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({'size': value})
            })
    }

}

$(document).on('click', '#delete-category', function(e){
    e.preventDefault();
    let cat_id = $(this).attr('data-id'),
    model = $(this).attr('data-model');

    deleteModel(model, cat_id);
})

$(document).on('click', '#delete-owner', function(e){
    e.preventDefault();
    let cat_id = $(this).attr('data-id'),
    model = $(this).attr('data-model');

    deleteModel(model, cat_id);
})

$(document).on('click', '#delete-size', function(e){
    e.preventDefault();
    let cat_id = $(this).attr('data-id'),
    model = $(this).attr('data-model');

    deleteModel(model, cat_id);
})

$(document).on('click', '#delete-product', function(e){
    e.preventDefault();
    let cat_id = $(this).attr('data-id'),
    model = $(this).attr('data-model');

    deleteModel(model, cat_id);
})

$(document).on('click', '#delete-variant', function(e){
    e.preventDefault();
    let var_id = $(this).attr('data-id'),
    model = $(this).attr('data-model');

    deleteModel(model, var_id);
})

function deleteModel(model, id){
    var csrftoken = getToken('csrftoken');
    if(model=='category'){
        fetch('api/modifyCategory', {
                method: "DELETE",
                headers: {
                    'Content-Type':'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({'id': id})
            })
    }
    else if(model=='owner'){
        fetch('api/modifyOwner', {
                method: "DELETE",
                headers: {
                    'Content-Type':'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({'id': id})
            })
    }
    else if(model=='size'){
        fetch('api/modifySize', {
                method: "DELETE",
                headers: {
                    'Content-Type':'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({'id': id})
            })
    }
    else if(model=='product'){
        fetch(update_product_url, {
                method: "DELETE",
                headers: {
                    'Content-Type':'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({'id': id})
            })
    }
    else if(model=='variant'){
        fetch(modify_variant_url, {
                method: "DELETE",
                headers: {
                    'Content-Type':'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({'id': id})
            })
    }
}