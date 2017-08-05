$(document).ready(function() {
    $('.fadein .slide:gt(0)').hide();
    setInterval(function(){
    	$('.fadein > :first-child').fadeOut().next('.slide').fadeIn().end().appendTo('.fadein');
    }, 3500);

    
});
