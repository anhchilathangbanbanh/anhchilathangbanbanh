$(document).ready(function() {
    $('.fadein .slide:gt(0)').hide();
    setInterval(function(){
    	$('.fadein > :first-child').fadeOut().next('.slide').fadeIn().end().appendTo('.fadein');
    }, 3500);

    $('.main-content .wrapper').slick({
        centerMode: true,
        slidesToShow: 3,
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    infinite: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    infinite: true
                }
            }
        ]
    });
});
