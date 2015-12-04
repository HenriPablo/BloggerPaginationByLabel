$(document).ready( function(){
    $('#disapprovers-menu li a.trigger').click( function(){
        var activeSection = $(  $(this).attr('href'));
        $('section').not( activeSection).hide();
        activeSection.show();
    });
})