$(document).ready( function(){
    $('#disapprovers-menu li a.trigger').click( function( e ){
        e.preventDefault();
        var activeSection = $(  $(this).attr('href'));
        $('section').not( activeSection).slideUp( 2000 );
        activeSection.slideDown( 2000 );
    });
})