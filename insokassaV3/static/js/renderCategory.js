const ul = document.getElementById('category-list')
const url = 'api/getProductCategory'
// dynamically renders category list on sidebar of mainpage
$(document).ready(function(){
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let categories = data;

            categories.map(function(item){
                let li = document.createElement('li')
                let button = $(document.createElement('button')).addClass('list-button').attr('data-id', item.id).text(item.category).appendTo(li);
                ul.appendChild(li);
            });
        })

        .catch(function(error){
            console.log(error);
        })

});