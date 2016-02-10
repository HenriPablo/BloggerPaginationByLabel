$(document).ready( function(){

    /* DISAPPROVER THUMBNAILS */
    var molly = { 'src': 'https://4.bp.blogspot.com/--7Fnusj78tg/Vg5g2ee2dcI/AAAAAAAAD0c/h85aEdLkJjE/s200/suzy-and-molly-in-bunndo_1.jpg'};

    $('body').append('<div id="disapprover-tip" style="position: absolute; display: none; width: 50px; height: 50px; overflow: hidden; border-radius: 100px;"><img src="" /></div>')

    $('.disapprover-pix-tip').on( 'mouseenter', function(){
        $('#disapprover-tip img').attr('src', molly );
        $('#disapprover-tip').show().css({'top': ($(this).offsetTop + 20) + 'px', 'left': ($(this).offsetLeft + 20) + 'px' });

    });

    $('.disapprover-pix-tip').on( 'mouseleave', function(){
        $('#disapprover-tip img').attr('src',''  );
        $('#disapprover-tip').hide();
    });
});