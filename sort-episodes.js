$(document).ready(function () {

    var recentFirst = true;
    
    
    function sortEpisodes() {
          var episodes = $("ul.story-episodes");    
        var dl = $("ul.story-episodes li");
        var sortedItems = dl.sort(function (a, b) {

            //console.log($(a).data('date'));
            //console.log( 'recentFirst: ' + recentFirst );
            //console.log( 'd1: ' + d1 );
            //console.log( 'd2: ' + d2 );
            
            if (recentFirst) {
               // console.log( 'recentFirst')
                var d2 = new Date($(a).data('date'));
                var d1 = new Date($(b).data('date'));
                return d1 > d2 ? 1 : -1;

            } else {
                var d1 = new Date($(a).data('date'));
                var d2 = new Date($(b).data('date'));
                //console.log( 'oldestFirst')
                //console.log( "d1 > d2: " + ( d1 > d2 ))
                return d1 < d2 ? -1 : 1;
            }
        });

        //console.dir( sortedItems )
        episodes.empty();
        episodes.append( sortedItems );
    }

    $('#recent-first').on('click', function () {
        recentFirst = true;
        sortEpisodes();
    });

    $('#oldest-first').on('click', function () {
        recentFirst = false;
        sortEpisodes();
    });


});

