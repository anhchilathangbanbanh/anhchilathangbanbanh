$(document).ready(function() {
    $.ajax({
        url: '/api/cake-category/get-list-cake-category',
        method: 'get'
    }).done(function(result) {
        var html;
        result.data.forEach(function(v, i) {
            html += `<div class="column-custom">
                        <img class="image-responsive" src=${v.avatar}>
                        <div class="category-name">${v.name}</div>
                    </div>`
        });

        $('.wrapper')
            // .slick('unslick')
            .append(html)
            .slick({
                centerMode: true,
                speed: 300,
                arrows: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });

    }).fail(function(err) {
        alert(err);
    });
});
