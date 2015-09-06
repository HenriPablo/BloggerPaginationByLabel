/*
 TODO: implement dynamic loading of scripts if we have a disapprovers story

 // from: http://www.html5rocks.com/en/tutorials/speed/script-loading/
 [
 '//other-domain.com/1.js',
 '2.js'
 ].forEach(function(src) {
 var script = document.createElement('script');
 script.src = src;
 script.async = false;
 document.head.appendChild(script);
 });
 */

$(document).ready( function() {

    var pager = {
        creds : {
            key : "AIzaSyChPDh-rh9eJlVlYuLiDW2nvJegZksFhEw",
            blogID : "6635756895615555070"
        },
        defaults : {
            /* PROD */
            //currentUrl :  window.location.pathname.toString()

            /* TESTING */
            currentUrl : "http://www.disapprovingbun.com/2015/07/the-disapprovers-climbing-back.html",

            plist : [],
            linkCnt : 0,
            paginationWidget : $('<div id="pagination-widget" class="pagination-widget"><div class="title-bar" id="title-bar"></div></div>'),
            paginatorDestination : $('.post-labels'), // $('.post-body');
            currentTipClass : "current-tip",

            tips : $('#tips'),
            links : $('#links')
        },
        label : (function () {

            var labels = $('.post-labels a');
            if( labels.length > 1 ){
                return alert("we have more than 1 label for this post");
            } else{
                return encodeURIComponent( labels.text() );
            }

        })(),
        init : (function(){
            paginationWidget.insertAfter( paginatorDestination );
            paginationWidget.append( '<div id="tips" class="tips"></div>');
            paginationWidget.append('<div id="links" class="links"></div>');
        })(),

        getJSONQueryString : function( t ){
            //console.dir( t );
            var t = (function(){
                if( t === null ){
                    return "";
                } else {
                    return ( "pageToken="  + t + "&" )
                }
            })();
            var tt = 'https://www.googleapis.com/blogger/v3/blogs/' + blogId + '/posts?fetchBodies=false&labels=' + label + '&' + t + 'key=' + key;
            return tt;
        },

        showPageLinks : function( pageLinks ){
            var linkCnt = 0;
            //console.dir( pageLinks );
            //console.log( "page links length: " + pageLinks.length )

            var tempClass = "";
            var tempRemider = "";
            //alert( pageLinks.length );
            pageLinks.reverse();
            $( pageLinks ).each( function( idx){
                linkCnt = linkCnt + 1;

                //console.log( "this.url: " + this.url );

                if( this.url.indexOf( currentUrl ) > -1 ){
                    tempClass  =  " " + currentTipClass;
                    tempRemider = "You are currently viewing episode &nbsp;&nbsp;&nbsp;";
                } else {
                    tempClass = "";
                    tempRemider = "";
                }

                tips.append( '<span class="title-tip ' + tempClass + '" data-tip-id="' + linkCnt + '">'  + tempRemider + "<strong>" + this.title + '</strong>' + '&nbsp;&nbsp;&nbsp; published on ' + new Date(this.published).toLocaleDateString() + '</span>' )
                links.append( $('<a class="nav-spot'+ tempClass  + '" data-link-id="' + linkCnt + '" href="' + this.url  + '" >' + ( linkCnt) +'</a>'));
            });

            var touchDev = false;
            var touched = false;

            $('a.nav-spot').on({
                'touchstart': function( e ){
                    console.log(e.timeStamp)
                    e.stopPropagation();
                    e.preventDefault();
                    touchDev = true;
                    console.log('touchDev: ' + touchDev );
                    if(!$(this).hasClass('touched')){
                        //$('.title-tip.current-tip').hide();
                        $('.title-tip').hide().removeClass('current-tip');
                        $( 'span[data-tip-id="' + $(this).attr('data-link-id') + '"]' ).fadeIn( 150).addClass('current-tip');
                        $('a.nav-spot').removeClass('touched');
                        $(this).addClass('touched')
                        touched = true;
                        return false;
                    } else {
                        //console.log( 'if - hasClass touched: going to a different page')
                        window.location = $(this).attr('href');
                        //return false;
                    }
                },
                'touchend' : function( e ){
                    e.stopPropagation();
                    e.preventDefault();
                    //console.log( 'touch end fired ')
                },
                'click' : function( e ){
                    e.stopPropagation();
                    e.preventDefault();
                    //console.log( 'clicked')
                    window.location = $(this).attr('href');
                },
                'mouseenter' : function(){
                    //console.log( 'mouse entered')
                    touchDev = false;
                    $('.title-tip.current-tip').hide();
                    $( 'span[data-tip-id="' + $(this).attr('data-link-id') + '"]' ).fadeIn( 150 );
                },
                'mouseleave' : function(){
                    //console.log( 'mouse left')
                    touchDev = false;

                    if( $(this).hasClass( currentTipClass )){
                        $('span.current-tip').show();
                    } else {
                        $( 'span[data-tip-id="' + $(this).attr('data-link-id') + '"]' ).fadeOut( 150 );
                        $('.title-tip.current-tip').show();
                    }
                }
            });
        },
        getPLIst : function( t ){
            var t = t || null;
            $.ajax({

                url: getJSONQueryString( t ),
                type: 'get',
                dataType: "jsonp",
                success: function (data) {
                    var tempClass = ""

                    for( var i = 0; i < data.items.length; i++){
                        linkCnt = linkCnt + 1;
                        plist.push( data.items[i] );
                    }

                    if( data.hasOwnProperty('nextPageToken') ){
                        getPList( data.nextPageToken );
                    } else {
                        showPageLinks( plist );
                    }
                }
            });
        }

    }

    /* PRODUCTION */
    var currentUrl = window.location.pathname.toString();
    //console.dir( window.location );

    /* DEV */
    var currentUrl = "http://www.disapprovingbun.com/2015/07/the-disapprovers-climbing-back.html";
    var label = (function () {

        var labels = $('.post-labels a');
        if( labels.length > 1 ){
            return alert("we have more than 1 label for this post");
        } else{
            return encodeURIComponent( labels.text() );
        }

    })();

    if( currentUrl.indexOf('disapprovers') > -1 ){
        //console.log('we have disapprovers');
        //console.log( currentUrl );
        var key = "replace-with-prod-val";
        var blogId = "replace-with-prod-val";

        var plist = [];
        var linkCnt = 0;

        var paginationWidget = $('<div id="pagination-widget" class="pagination-widget"><div class="title-bar" id="title-bar"></div></div>');
        var paginatorDestination = $('.post-labels');// $('.post-body');

        //var url = "http://www.disapprovingbun.com/2015/07/the-disapprovers-climbing-back.html";
        var currentTipClass = "current-tip"

        paginationWidget.insertAfter( paginatorDestination );
        paginationWidget.append( '<div id="tips" class="tips"></div>');
        paginationWidget.append('<div id="links" class="links"></div>');

        var tips = $('#tips');
        var links = $('#links');

        function showPageLinks( pageLinks ){
            var linkCnt = 0;
            //console.dir( pageLinks );
            //console.log( "page links length: " + pageLinks.length )

            var tempClass = "";
            var tempRemider = "";
            //alert( pageLinks.length );
            pageLinks.reverse();
            $( pageLinks ).each( function( idx){
                linkCnt = linkCnt + 1;

                //console.log( "this.url: " + this.url );

                if( this.url.indexOf( currentUrl ) > -1 ){
                    tempClass  =  " " + currentTipClass;
                    tempRemider = "You are currently viewing episode &nbsp;&nbsp;&nbsp;";
                } else {
                    tempClass = "";
                    tempRemider = "";
                }

                tips.append( '<span class="title-tip ' + tempClass + '" data-tip-id="' + linkCnt + '">'  + tempRemider + "<strong>" + this.title + '</strong>' + '&nbsp;&nbsp;&nbsp; published on ' + new Date(this.published).toLocaleDateString() + '</span>' )
                links.append( $('<a class="nav-spot'+ tempClass  + '" data-link-id="' + linkCnt + '" href="' + this.url  + '" >' + ( linkCnt) +'</a>'));
            });


            var touchDev = false;
            var touched = false;

            $('a.nav-spot').on({
                'touchstart': function( e ){
                    console.log(e.timeStamp)
                    e.stopPropagation();
                    e.preventDefault();
                    touchDev = true;
                    console.log('touchDev: ' + touchDev );
                    if(!$(this).hasClass('touched')){
                        //$('.title-tip.current-tip').hide();
                        $('.title-tip').hide().removeClass('current-tip');
                        $( 'span[data-tip-id="' + $(this).attr('data-link-id') + '"]' ).fadeIn( 150).addClass('current-tip');
                        $('a.nav-spot').removeClass('touched');
                        $(this).addClass('touched')
                        touched = true;
                        return false;
                    } else {
                        //console.log( 'if - hasClass touched: going to a different page')
                        window.location = $(this).attr('href');
                        //return false;
                    }
                },
                'touchend' : function( e ){
                    e.stopPropagation();
                    e.preventDefault();
                    //console.log( 'touch end fired ')
                },
                'click' : function( e ){
                    e.stopPropagation();
                    e.preventDefault();
                    //console.log( 'clicked')
                    window.location = $(this).attr('href');
                },
                'mouseenter' : function(){
                    //console.log( 'mouse entered')
                    touchDev = false;
                    $('.title-tip.current-tip').hide();
                    $( 'span[data-tip-id="' + $(this).attr('data-link-id') + '"]' ).fadeIn( 150 );
                },
                'mouseleave' : function(){
                    //console.log( 'mouse left')
                    touchDev = false;

                    if( $(this).hasClass( currentTipClass )){
                        $('span.current-tip').show();
                    } else {
                        $( 'span[data-tip-id="' + $(this).attr('data-link-id') + '"]' ).fadeOut( 150 );
                        $('.title-tip.current-tip').show();
                    }
                }

            });



        }

        function getJSONQueryString( t ){
            //console.dir( t );
            var t = (function(){
                if( t === null ){
                    return "";
                } else {
                    return ( "pageToken="  + t + "&" )
                }
            })();
            var tt = 'https://www.googleapis.com/blogger/v3/blogs/' + blogId + '/posts?fetchBodies=false&labels=' + label + '&' + t + 'key=' + key;
            return tt;
        }

        function getPList( t ){
            var t = t || null;
            $.ajax({

                url: getJSONQueryString( t ),
                type: 'get',
                dataType: "jsonp",
                success: function (data) {
                    var tempClass = ""

                    for( var i = 0; i < data.items.length; i++){
                        linkCnt = linkCnt + 1;
                        plist.push( data.items[i] );
                    }

                    if( data.hasOwnProperty('nextPageToken') ){
                        getPList( data.nextPageToken );
                    } else {
                        showPageLinks( plist );
                    }
                }
            });
        }

        //getPList();
        pager.getPLIst();
    }
});