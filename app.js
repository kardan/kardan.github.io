/*jslint browser: true*/
/*global $, jQuery, console */

(function () {
    "use strict";

    var kardans = {

        init: function () {
            this.setupNav();
            this.setupCover();
            // this.setupTweets();
            // this.setupBookmarks();
            this.logForTheCurious();
        },

        logForTheCurious: function () {
            var quotes = [
                'We are what we repeatedly do. Excellence, then, is not an act, but a habit. / Aristotele',
                'It is the mark of an educated mind to be able to entertain a thought without accepting it. / Aristoteles',
                'I\'ve suffered a great many catastrophies in my life. Most of them never happened. / Mark Twain',
                'Be a yardstick of quality. Some people aren\'t used to an environment where excellence is expected. / Steve Jobs',
                'Stay hungry, stay foolish. / Steve Jobs',
                'Fortune favours the brave. / Terence',
                'Sow a thought and you reap an action; sow an act and you reap a habit; sow a habit and you reap a character; sow a character and you reap a destiny. / Ralph Waldo Emerson'
            ];
            console.log(quotes[Math.floor(Math.random() * quotes.length)]);
        },

        setupNav: function () {
            $("nav ul li a").hover(function () {
                $(this).animate({paddingLeft: '48px', marginRight: '0px'}, 'fast');
            }, function () {
                $(this).animate({paddingLeft: '24px', marginRight: '24px'}, 'fast');
            });
        },

        setupCover: function () {
            $.get("cover.jpg", function (data) {
                $('#wrap').removeAttr("style");
                $('#wrap').css({
                    'background': 'url(cover.jpg) no-repeat center center fixed',
                    '-webkit-background-size': 'cover',
                    '-moz-background-size': 'cover',
                    '-o-background-size': 'cover',
                    'background-size': 'cover'
                });
                $('#wrap').attr('id', '#wrap2');
                $('body').css({
                    'background': 'url(cover.jpg) no-repeat center center fixed',
                    '-webkit-background-size': 'cover',
                    '-moz-background-size': 'cover',
                    '-o-background-size': 'cover',
                    'background-size': 'cover'
                });
                // $('#wrap').removeAttr('style');
            });
            $('#wrap').removeAttr('style');
            $('#wrap').removeClass('wrap');
            $('#wrap').addClass('wrap2');
        },

        setupTweets: function () {
            this.getTweets(function (tweets) {
                var i, j;
                if (tweets.length !== 0) {
                    $('#noise').show();
                    for (i = 0, j = tweets.length; i < j; i += 1) {
                        $('#the_noice').append('<a href=\"' + tweets[i].url + '">' + tweets[i].text + '</a> ');
                    }
                }
            });
        },

        getTweets: function (callback) {
            $.ajax({
                url: 'http://search.twitter.com/search.json?q=from:kardan',
                jsonp: 'callback',
                dataType: 'jsonp',
                success: function (data) {
                    var items = [];
                    $.each(data.results, function (key, val) {
                        items.push({
                            'id': val.id,
                            'text': val.text,
                            'date': val.created_at,
                            'url': 'http://twitter.com/' + val.from_user + '/status/' + val.id + '/'
                        });
                    });
                    callback(items);
                }
            });
        },

        setupBookmarks: function () {
            this.getBookmarks(function (bookmarks) {
                var i, j;
                if (bookmarks.length !== 0) {
                    $('#noise').show();
                    for (i = 0, j = bookmarks.length; i < j; i += 1) {
                        $('#the_noice').append('<a href=\"' + bookmarks[i].url + '">' + bookmarks[i].title + '</a> ');
                    }
                }
            });
        },

        getBookmarks: function (callback) {
            $.ajax({
                url: 'http://feeds.pinboard.in/json/u:kardan?count=5',
                jsonp: 'cb',
                dataType: 'jsonp',
                success: function (data) {
                    var items = [];
                    $.each(data, function (key, val) {
                        items.push({
                            'title': val.d,
                            'date': val.dt,
                            'url': val.u
                        });
                    });
                    callback(items);
                }
            });
        }
    };

    $(document).ready(function () {
        kardans.init();
    });
}());
