/**
 *
 * @type {[null,null]}
 *
 *  "d" - date episode was published
 *  "u" - url of episode
 *  "t" - title of episode
 *  "p" - paragraph with short description of episode
 *
 */

var xPlusBunEpisodes =
    [
        {
            "d" : "2017-09-02",
            "u" : "http://www.disapprovingbun.com/2017/09/x-plus-bun-improbabilistic-sim.html",
            "t" : "X-Plus Bun - The Improbabilistic Sim",
            "p" : "Mr. Toes has a nightmare about flying and landing a space vehicle without being able to stop on a long runway. Him and Abby fly off the end of the runway and fall off a cliff into a an ocean."
        },
        {
            "d" : "2017-09-30",
            "u" : "http://www.disapprovingbun.com/2017/09/x-plus-bun-one-with-void-pt-1-of-3.html",
            "t" : "One with the void - pt. 1 of 3",
            "p" : "Freddie unveils a hypothesis of what lead up the drifter's demise."
        },
        {
            "d" : "",
            "u" : "",
            "t" : "",
            "p" : ""
        }
    ];

$( document ).ready( function () {

    var episodesUL = $("#story-episodes");

    for ( var i = 0; i < xPlusBunEpisodes.length; i++ ){

        episodesUL.append(
            $( '<li>' ).attr('data-date', xPlusBunEpisodes[i]["d"] )
                .append(
                    $('<a>').attr('href', xPlusBunEpisodes[i]["u"] )
                        .append(
                            $('<span>').addClass('date').text( new Date(xPlusBunEpisodes[i]["d"]).toDateString() )
                        )
                         .append(
                            $('<strong>').addClass('title').text( xPlusBunEpisodes[i]["t"] )
                            )
                        )
                        .append( $('<p>' )
                            .append(
                                xPlusBunEpisodes[i]["p"]
                            )
                        )
        );

    }

});