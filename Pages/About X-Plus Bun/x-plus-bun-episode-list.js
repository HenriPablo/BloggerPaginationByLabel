/**
 *
 * @type {[null,null]}
 *
 */

var xPlusBunEpisodes =
    [
        {
            "dataDate" : "2017-09-02",
            "url":"http://www.disapprovingbun.com/2017/09/x-plus-bun-improbabilistic-sim.html",
            "title" : "X-Plus Bun - The Improbabilistic Sim",
            "p":"Mr. Toes has a nightmare about flying and landing a space vehicle without being able to stop on a long runway. Him and Abby fly off the end of the runway and fall off a cliff into a an ocean."
        },
        {
            "dataDate" : "2017-09-30",
            "url" : "http://www.disapprovingbun.com/2017/09/x-plus-bun-one-with-void-pt-1-of-3.html",
            "title" : "One with the void - pt. 1 of 3",
            "p" : "Freddie unveils a hypothesis of what lead up the drifter's demise."
        },
        {
            "dataDate" : "",
            "url" : "",
            "title" : "",
            "p" : ""
        }
    ];

$( document ).ready( function () {

    var episodesUL = $("#story-episodes");

    for ( var i = 0; i < xPlusBunEpisodes.length; i++ ){

        episodesUL.append(
            $('<li>')
                .append(
                    $('<a>').attr('href', xPlusBunEpisodes[i]["url"] )
                        .append(
                            $('<span>').addClass('date').text( new Date(xPlusBunEpisodes[i]["dataDate"]).toDateString() )
                        )
                        .append(
                            $('<strong>').addClass('title').text( xPlusBunEpisodes[i]["title"] )
                        )
                        .append( $('<p>' )
                            .append(
                                xPlusBunEpisodes[i]["p"]
                            )
                        )
            ).data("date", xPlusBunEpisodes[i]["dataDate"] )
        );

    }

});