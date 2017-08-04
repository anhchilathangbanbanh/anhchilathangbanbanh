$(document).ready(function() {
    $.ajax({
        url: '/api/cake-category/get-list-cake-category',
        method: 'get'
    }).then(function(result) {
        console.log(result);
    });
});
