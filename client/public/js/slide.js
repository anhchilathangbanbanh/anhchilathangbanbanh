$(document).ready(function() {
    $('.fadein .slide:gt(0)').hide();
    setInterval(function(){
    	$('.fadein > :first-child').fadeOut().next('.slide').fadeIn().end().appendTo('.fadein');
    }, 3500);

    $('.main-content .wrapper').slick({
        centerMode: true,
        centerPadding: '30px',
        slidesToShow: 3,
        dots: true,
        useCSS: true,
        responsive: [
        {
            breakpoint: 768,
            settings: {
                centerMode: true,
                centerPadding: '10px',
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: false,
                variableWidth: true,
                centerPadding: '0px',
                slidesToShow: 1
            }
        }
        ]
    });
});
