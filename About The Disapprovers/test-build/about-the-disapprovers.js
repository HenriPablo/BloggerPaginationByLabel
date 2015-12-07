$(document).ready( function(){
    $('#disapprovers-menu li a.trigger').click( function( e ){
        e.preventDefault();
        var activeSection = $(  $(this).attr('href'));
        $('section').not( activeSection).slideUp( "slow" );
        activeSection.slideDown( "slow" );
    });
})