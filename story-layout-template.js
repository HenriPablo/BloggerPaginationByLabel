$(document).ready( function(){

    /* DISAPPROVER THUMBNAILS */
    var disapprovers = ['Mr. Toes', 'Molly', 'Abby', 'Cleo', 'Suzy', 'Zeus', 'Frankie', 'Freddie', 'Mila', 'Izzie', 'Appolo', 'Bruno'];
    var txt = ""
    

    $(disapprovers).each( function(){
       txt = $(this).get().join("");
        console.log(txt)
        var re = new RegExp(txt, "g");
        $("div.story-row:contains('"+ txt + "')").html(function(_, html) {
            return html.replace( re, '<span class="disapprover-pix-tip ' + txt.toLowerCase() + '">' + txt + '</span>');
});
    });

});