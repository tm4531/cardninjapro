/*========================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Project: Casine - Casino and gambling HTML5 Template
Author: ingenious_team
Version: 1.00
Last change:    11/ 05 /2020
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================================================*/
$(function () {
    "use strict";

    // for navbar background color when scrolling
    $(window).scroll(function () {
        var $scrolling = $(this).scrollTop();
        var bc2top = $("#back-top-btn");
        var stickytop = $(".sticky-top");
        if ($scrolling >= 10) {
            stickytop.addClass('navcss');
        } else {
            stickytop.removeClass('navcss');
        }
        if ($scrolling > 150) {
            bc2top.fadeIn(1000);
        } else {
            bc2top.fadeOut(1000);
        }
    });


    $('.full_nav .nav > li > .more-less').on('click', function () {
        $('.full_nav .nav').toggleClass("tog-nav");
        $('.full_nav .nav').toggleClass("fa-time");
    });

    //animation scroll js
    var nav = $('nav'),
        navOffset = nav.offset().top,
        $window = $(window);
    /* navOffset ends */
    
    var html_body = $('html, body');
    $('nav a').on('click', function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                html_body.animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
                return false;
            }
        }
    });


    // navbar js ends here

    // this is for back to top js
    var bc2top = $('#back-top-btn');
    bc2top.on('click', function () {
        html_body.animate({
            scrollTop: 0
        }, 1300);
    });

    // Closes responsive menu when a scroll link is clicked
    $('.nav-link').on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });
    
      
    /* -------------------------------------
	          Running slick js				
	 	-------------------------------------- */
    $('.score-slick').slick({
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: false,
        vertical: true,
        swipeToSlide: true,
        verticalSwiping: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [

            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 6

                }
    },
            {
                breakpoint: 990,
                settings: {
                    slidesToShow: 6,

                }
    }
  ]

    });

    /* -------------------------------------
             Count-down js			
    	-------------------------------------- */

    $('.count-down').countdown('2030/08/11', function (event) {
        $(this).html(event.strftime('%H'));
    });
    $('.count-down2').countdown('2030/08/01', function (event) {
        $(this).html(event.strftime('%M'));
    });

    $('.count-down3').countdown('2030/11/22', function (event) {
        $(this).html(event.strftime('%S'));
    });


    /* -------------------------------------
	          youtube video js start here			
	 	-------------------------------------- */
    jQuery("a.bla-1").YouTubePopUp({
        autoplay: 0
    }); // Disable autoplay



    /* -------------------------------------
	          Preloader				
	 	-------------------------------------- */
    $('.preloader').delay(2500).fadeOut(1000);


});