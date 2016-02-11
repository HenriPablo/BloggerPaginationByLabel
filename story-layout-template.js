$(document).ready( function(){

    /* DISAPPROVER THUMBNAILS */
    if( $('div.story-txt').length > 0 ){
        var disapprovers = ['Mr. Toes', 'Molly', 'Abby', 'Cleo', 'Suzy', 'Zeus', 'Frankie', 'Freddie', 'Mila', 'Milly', 'Izzie', 'Appolo', 'Bruno'];

        for(var i = 0; i< disapprovers.length; i++) {
            var re = new RegExp(disapprovers[i], "g");
               $("div.story-txt:contains('"+ disapprovers[i] + "')").html(function(_, html) {
                return html.replace( re, '<span class="disapprover-pix-tip ' + disapprovers[i].toLowerCase() + '">' + disapprovers[i] + '</span>');
              });   
        }
    }
});
