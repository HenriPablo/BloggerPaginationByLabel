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
            currentUrl :  window.location.pathname.toString(),

            /* TESTING */
            //currentUrl : "http://www.disapprovingbun.com/2015/07/the-disapprovers-climbing-back.html",

            plist : [],
            linkCnt : 0,
            currentTipClass : "current-tip",
            posts : $('.post'),                 /* we need to know if we have more that 1 post */
            labels : $('.post-labels a')
        }
    }

    pager.label = (function () {
            if( pager.defaults.labels.length > 1 ){
                //return alert("we have more than 1 label for this post");
            } else{
                return encodeURIComponent( pager.defaults.labels.text() );
            }
        })();

    pager.init = function(){
        /*
            check for labels and a single post,
            TODO: implement multip post, multi label pager loaded only on demand
        */
        if( ( pager.defaults.labels.length > 0 ) && ( pager.defaults.posts.length < 2 ) ){
            pager.getBlogPostData();
        } else {
            //alert('Post Has No Labels');
            $('.post-labels a').each( function(){
                $(this).wrap('<span class="lbl-wrapper" style="border:1px solid #efefef; background-color:#fefefe;padding:3px;border-radius:3px"></span>');
                $(this).parent().append('<span class="paginator-trigger" style="padding:5px; border-radius:5px; background-color:#666; color:#fff">+</span>')
                $(this).next('.paginator-trigger').click( function( e ){
                    $('#pagination-widget').remove();
                    pager.defaults.labels = $(this).prev().text();
                    //alert('hello from lable: ' + $(this).prev().text() );
                    pager.buildPaginatorContainer(  $(this) );
                    pager.getBlogPostData( /*pager.getJSONQueryString( encodeURIComponent( $(this).prev().text() ))*/);
                });
            });
        }

    }

    pager.buildPaginatorContainer = function( attachTo ){
        
         var paginatorDestination = $('.post-labels');     
        
        var paginationWidget = $('<div id="pagination-widget" class="pagination-widget"><div class="title-bar" id="title-bar"></div></div>');
       

        paginationWidget.append( '<div id="tips" class="tips"></div>');
        paginationWidget.append('<div id="links" class="links"></div>');
        var tips = $('#tips');
        var links = $('#links');
        
        if( attachTo !== undefined ){
            paginatorDestination = attachTo;
            paginationWidget.appendTo( attachTo );
        } else {
           paginationWidget.insertAfter( paginatorDestination );
        }
    }

    pager.getJSONQueryString = function( t ){
        alert( "incoming next page token in getJSONQueryString: " + t)
        var t = (function(){
            if( t === null ){
                return "";
            } else {
                return ( "pageToken="  + t + "&" )
            }
        })();
        alert( "deduced next page token to: " + t )
        var tt = 'https://www.googleapis.com/blogger/v3/blogs/' + pager.creds.blogID + '/posts?fetchBodies=false&labels=' + pager.label + '&' + t + 'key=' + pager.creds.key;
        return tt;
    },

    pager.buildPaginatorLinksAndTips = function( pageLinks ){
        if( $('#pagination-container').length === 0 ){
            pager.buildPaginatorContainer();
        }
        
        var linkCnt = 0;
        var tempClass = "";
        var tempRemider = "";
        pageLinks.reverse();
        $( pageLinks ).each( function( idx){
            linkCnt = linkCnt + 1;

            if( this.url.indexOf( pager.defaults.currentUrl) > -1 ){
                tempClass  =  " " + pager.defaults.currentTipClass;
                tempRemider = "You are currently viewing episode &nbsp;&nbsp;&nbsp;";
            } else {
                tempClass = "";
                tempRemider = "";
            }

            $("#tips").append( '<span class="title-tip ' + tempClass + '" data-tip-id="' + linkCnt + '">'  + tempRemider + "<strong>" + this.title + '</strong>' + '&nbsp;&nbsp;&nbsp; published on ' + new Date(this.published).toLocaleDateString() + '</span>' )
            $("#links").append( $('<a class="nav-spot'+ tempClass  + '" data-link-id="' + linkCnt + '" href="' + this.url  + '" >' + ( linkCnt) +'</a>'));
        });

        var touchDev = false;
        var touched = false;

        $('a.nav-spot').on({
            'touchstart': function( e ){
                e.stopPropagation();
                e.preventDefault();
                touchDev = true;
                if(!$(this).hasClass('touched')){
                    $('.title-tip').hide().removeClass('current-tip');
                    $( 'span[data-tip-id="' + $(this).attr('data-link-id') + '"]' ).fadeIn( 150).addClass('current-tip');
                    $('a.nav-spot').removeClass('touched');
                    $(this).addClass('touched')
                    touched = true;
                    return false;
                } else {
                    window.location = $(this).attr('href');
                }
            },
            'touchend' : function( e ){
                e.stopPropagation();
                e.preventDefault();
            },
            'click' : function( e ){
                e.stopPropagation();
                e.preventDefault();
                window.location = $(this).attr('href');
            },
            'mouseenter' : function(){
                touchDev = false;
                $('.title-tip.current-tip').hide();
                $( 'span[data-tip-id="' + $(this).attr('data-link-id') + '"]' ).fadeIn( 150 );
            },
            'mouseleave' : function(){
                touchDev = false;
                if( $(this).hasClass( pager.defaults.currentTipClass )){
                    $('span.current-tip').show();
                } else {
                    $( 'span[data-tip-id="' + $(this).attr('data-link-id') + '"]' ).fadeOut( 150 );
                    $('.title-tip.current-tip').show();
                }
            }
        });
    },
    pager.getBlogPostData = function( t ){
        var t = t || null;
        $.ajax({

            url: pager.getJSONQueryString( t ),
            type: 'get',
            dataType: "jsonp",
            success: function (data) {
                for( var i = 0; i < data.items.length; i++){
                    pager.defaults.plist.push( data.items[i] );
                }

                if( data.hasOwnProperty('nextPageToken') ){
                    pager.getBlogPostData( data.nextPageToken );
                } else {
                    pager.buildPaginatorLinksAndTips( pager.defaults.plist );
                }
            }
        });
    }
        pager.init();
});
