const calc_buttons = $('.num-button');
const input_menu = $('#income');

// function for on page numpad
$(document).ready(function(){
    calc_buttons.each(function(){
        $(this).click(function(){
            if($(this).val() =='DEL'){
            $('#final_price').text($('#final_price').attr('data-value').concat(' ', 'руб.'))
            input_menu.val('');
            } else if($(this).val() == 'C'){
                input_menu.val(input_menu.val().slice(0, -1));
                $('#final_price').text($('#final_price').attr('data-value') - input_menu.val() + ''.concat(' ', 'руб.'))
            } else {
                input_menu.val(input_menu.val()+$(this).val());
                $('#final_price').text($('#final_price').attr('data-value') - input_menu.val() + ''.concat(' ', 'руб.'))
            };
        });
    });
})