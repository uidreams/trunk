$(document).ready(function(e){

    // if ($(this).scrollTop() < 500 && screen.width > 768) {
    //     $("#footer").hide();
    // }
    // else {
    //     $("#footer").show();
    // }

    // detect cn site to replace video src
    if (isCnSite()) {
        $('video').children('source').each(function(index,val)  {
            var curSrc = $(val).attr('src');
            curSrc = curSrc.replace("media.byton.com", "media.byton.cn");
            $(val).attr('src',curSrc);
            $(val).attr('data-src',curSrc);
        });

        $('video').each(function(index,val){
            val.load();
        })
    }

    function isCnSite(){
        return (window.location.host.indexOf('byton.cn') != -1) 
    }

    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    function update() {
        $('#santa-clara span').html(moment().tz("America/Los_Angeles").format("HH:mm A"));
        $('#munich span').html(moment().tz("Europe/Berlin").format("HH:mm A"));
        $('#hong-kong span').html(moment().tz("Hongkong").format("HH:mm A"));
        $('#beijing span').html(moment().tz("Asia/Shanghai").format("HH:mm A"));
        $('#nanjing span').html(moment().tz("Asia/Shanghai").format("HH:mm A"));
        $('#Shanghai span').html(moment().tz("Asia/Shanghai").format("HH:mm A"));

        $('.time.santa-clara').html(moment().tz("America/Los_Angeles").format("HH:mm A"));
        $('.time.munich').html(moment().tz("Europe/Berlin").format("HH:mm A"));
        $('.time.hong-kong').html(moment().tz("Hongkong").format("HH:mm A"));
        $('.time.beijing').html(moment().tz("Asia/Shanghai").format("HH:mm A"));
        $('.time.nanjing').html(moment().tz("Asia/Shanghai").format("HH:mm A"));
        $('.time.shanghai').html(moment().tz("Asia/Shanghai").format("HH:mm A"));
    }

    setInterval(update, 1000);
    AOS.init();

    $('.bxslider').bxSlider({
        pager: false
    });

    $('.center').slick({
        centerMode: true,
        variableWidth: true,
        infinite: false,
        slidesToShow: 1,
        arrows: true,
        dots: true,
        verticalScrolling: true,
        customPaging : function(center, i) {
            var title = $(center.$slides[i]).data('title');
            return '<a class="pager__item '+title+'">  </a>';
        },
        responsive: [
            {
                breakpoint: 830,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    variableWidth: false,
                    speed: 500,
                    fade: true
                }
            }
        ]
    });

    // feature slider

    // var item_length = $('.feature-slider > div').length - 1;
    $('.feature-slider').slick({
        centerMode: true,
        variableWidth: true,
        infinite: false,
        slidesToShow: 1,
        arrows: true,
        dots: true,
        verticalScrolling: false,
        afterChange: function(slide, index) {
            if( index === 0){
                //console.log('First Slide');
            } else if( index === 1 ){
                //console.log('Second Slide');
            } else if( index === 2){
                //console.log('Third Slide');
            } else if( index === 3) {
                //console.log('Fourth Slide');
            }
        },
        customPaging : function(feature, i) {
            var title = $(feature.$slides[i]).data('title');
            return '<a class="pager__item '+title+'"></a>';
        },
        responsive: [
            {
                breakpoint: 830,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    variableWidth: false,
                    speed: 500,
                    fade: true
                }
            }
        ]

    });

    $('.feature-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        if( currentSlide === 0){
            $('.text-pagination li a.active').removeClass('active');
            $('.text-pagination li.slide-1 a').addClass('active');
            //console.log('First Slide');
        } else if( currentSlide === 1 ){
            $('.text-pagination li a.active').removeClass('active');
            $('.text-pagination li.slide-2 a').addClass('active');
            //console.log('Second Slide');
        } else if( currentSlide === 2){
            $('.text-pagination li a.active').removeClass('active');
            $('.text-pagination li.slide-3 a').addClass('active');
            //console.log('Third Slide');
        } else if( currentSlide === 3) {
            $('.text-pagination li a.active').removeClass('active');
            $('.text-pagination li.slide-4 a').addClass('active');
            //console.log('Fourth Slide');
        }
    });

    $('a[data-slide]').click(function(e) {
        e.preventDefault();
        var slideno = $(this).data('slide');
        $('.text-pagination li a.active').removeClass('active');
        $(this).addClass('active');
        $('.feature-slider').slick('slickGoTo', slideno - 1);
    });

    var docWidth = $(window).width();
    var gridWidth = 1200;
    var closebtn = $('.cookieinfo-close');
    var rightPosition = (docWidth - gridWidth) / 2;

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {

        $('.map-slider-en').bxSlider({
            infiniteLoop: false,
            pager: false,
            hideControlOnEnd: true,
            useCSS: false
        });

        $('.map-slider-cn').bxSlider({
            startSlide: 2,
            infiniteLoop: false,
            pager: false,
            hideControlOnEnd: true,
            useCSS: false
        });
    } else {
        $('.map-bxslider').bxSlider({
            pagerCustom: '.bx-pager',
            mode: 'fade',
            speed: 10
        });

        closebtn.css({
            'position': 'absolute',
            right: rightPosition
        });
    }
    
    /* join page */

    if (isCnSite()) {
        $('.join-bxslider-1').prepend('<li><div class="join-banner-bg fmc_img_01"></div></li>');
        $('.join-bxslider-2 li:eq(0)').after('<li><div class="join-banner-bg fmc_img_02"></div></li>');
    }

    $('.join-bxslider-1').bxSlider({
        Controls: true,
        pager: false,
        mode: 'fade',
        auto: true,
        controls: false,
        infiniteLoop: true,
        pause: 4000
    });

    $('.join-bxslider-2').bxSlider({
        Controls: true,
        pager: false,
        mode: 'fade',
        auto: true,
        controls: false,
        infiniteLoop: true,
        pause: 6000
    });

    $('.join-bxslider-3').bxSlider({
        Controls: true,
        pager: false,
        mode: 'fade',
        auto: true,
        controls: false,
        infiniteLoop: true,
        pause: 8000
    });

    $('.join-bxslider-4').bxSlider({
        Controls: true,
        pager: false,
        mode: 'fade',
        auto: true,
        controls: false,
        infiniteLoop: true,
        pause: 10000
    });
    /* end join page */
    setTimeout(AOS.refreshHard, 150);



   /* Design Page
     ================================================================ */

   if(windowWidth > 1024 ){
       $(".design-slider .video-player").hover(function () {
           $(this).children("video")[0].play();
           $(this).children("/img").stop(true, false).animate({
               'opacity': '0'
           }, 500);
       }, function () {
           var el = $(this).children("video")[0];
           $(this).children("/img").stop(true, false).animate({
               'opacity': '1'
           }, 500);
           setTimeout(function(){
               el.currentTime = 0;
               el.pause();
           }, 500);
       });
   }

   /* Upload File
     ================================================================ */
    const inputs = document.querySelectorAll('.inputfile');

    $('input#resume-file').change(function(){
        $(".resume-file-name").text(this.files[0].name);
    });

    $('input#cover-letter-file').change(function(){
        $(".cover-file-name").text(this.files[0].name);
    });

    window.addeventasync = function(){
        addeventatc.settings({
            appleical  : {show:true, text:"Apple Calendar"},
            google     : {show:false, text:"Google <em>(online)</em>"},
            outlook    : {show:false, text:"Outlook"},
            outlookcom : {show:false, text:"Outlook.com <em>(online)</em>"},
            yahoo      : {show:false, text:"Yahoo <em>(online)</em>"}
        });
    };

    $(".modal-trigger").click(function () {
        
        $(".success-text").hide();
        $('.error-text').hide();
        var dataAttr = $(this).data('submodal');
        $('#inquiryModal .sign-up-wrapper').addClass('hidden');
        $('#' + dataAttr).removeClass('hidden');   
    });

    $('.switch-inquiry').click(function(e){
        e.preventDefault();
        // debugger;
        var dataAttr = $(this).data('switch');
        $(this).parent().addClass('hidden');
        $('#' + dataAttr).removeClass('hidden');
        //console.log(dataAttr);
    });

    setTimeout(function(){
        $('.atcb-link').addClass('foo box');
    }, 2000);


    $('.open-btn').on('click', function(){
        $(this).toggleClass('open');
    });

    // hide wrapper after fade out
    setTimeout(function() {
        $('.white-wrapper').css("display",'none')
    }, 1000);

    /* Concept Page
     ================================================================ */

    var slider_index = $('.index-slider').bxSlider({
        mode: 'fade',
        auto: true,
        speed: 2000,
        infiniteLoop: true,
        hideControlOnEnd: false,
        pause: 5000,
        video: false,
        adaptiveHeight: true,
        touchEnabled: false,
        pager: true,
        controls: true,
        stopAutoOnClick: true,
        autoStart: true,
        autoHover: true,
        onSliderLoad: function () {
            playTextTransition(true)
        },
        onSlideBefore: function ($slideElement, oldIndex, newIndex) {
            // fix for edge and safari flicker
            $slideElement.css("visibility", "hidden");
            setTimeout(function () {
                $slideElement.css("visibility", "visible");
            }, 100);
            // text transition
            playTextTransition(false)
        }
    });

    var slider_current = 0;
    function playTextTransition(firstLoad){
        //console.log(slider_index.active.index);
        $('.index-slider').children('li').each(function (key,li) {
            $(li).children('div').each(function(dKey, div) {
                $(div).children().each(function(eKey, element){
                    var aniIn = $(element).data('in');
                    var aniOut = $(element).data('out');
                    if($( li ).css("z-index") === 50 && !firstLoad){
                        $(element).removeClass(aniOut).addClass(aniOut).removeClass(aniIn)
                    }else{
                        $(element).removeClass(aniIn).addClass(aniIn).removeClass(aniOut)
                    }
                })
            })
        })
    }

    var slider4 = $('.image-slider').bxSlider({
        mode: 'horizontal',
        auto: true,
        adaptiveHeight: true,
        speed: 500,
        infiniteLoop: true,
        hideControlOnEnd: false,
        pause: 3000,
        video: true,
        stopAutoOnClick: true,
        autoStart: true,
        autoHover: true
    });

    

    var slider5 = $('.app-slide').bxSlider({
        mode: 'fade',
        auto: true,
        adaptiveHeight: true,
        speed: 500,
        infiniteLoop: true,
        hideControlOnEnd: true,
        pause: 3000,
        video: false,
        pager: true,
        controls: false,
        stopAutoOnClick: true,
        autoStart: false,
        autoHover: true
    });

   if ( slider5.length > 0 ){
        $(window).scroll(function(){
            if (slider5.isVisible()){
                slider5.startAuto();
            }
        });
    }

    $(".toggle-submenu").on('click', function() {
        $('.mobile-submenu-container').slideToggle(300);
    });

    $(".navbar-toggle").on('click', function() {
        $('body').toggleClass('no-scroll');
    });

    // Smooth Scrolling

    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });

    if (typeof($('.keep-ar').keepRatio) != "undefined")
        $('.keep-ar').keepRatio({ ratio: 16/9, calculate: 'height' });

});

$(window).scroll(function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {}
});

$(window).on('beforeunload', function() {
    // $(window).scrollTop(0);
});

/* Move down fullpage button
========================================================= */
//adding the action to the button
$(document).on('click', '.moveDown', function(){
    $.fn.fullpage.moveSectionDown();
});


/*  Go Back Button
========================================================= */

function goBack() {
    window.history.back();
}

/* File Upload
========================================================= */
function uploadFile(){
    var x = document.getElementById("file");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "No file chosen.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                var file = x.files[i];
                if ('name' in file) {
                    txt += file.name + "<br>";
                }
            }
        }
    }
    document.getElementById("fileName").innerHTML = txt;
}



/* Character counter for textarea
 ================================================================ */
/*

/* Rotate See More Button
================================================================= */
$( ".morelink" ).click(function() {
    if (  $( this ).css( "transform" ) == 'none' ){
        $(this).css("transform","rotate(45deg)");
        $(this).css("opacity","1");
        $(this).parent().addClass('opened');
    } else {
        $(this).css("transform","" );
        $(this).css("opacity","1");
        $(this).parent().removeClass('opened');
    }
});

/* Scroll to Top
==================================================================== */
$("#scroll").click(function() {
    if (screen.width > 768){
        $('html, body').animate({
            scrollTop: $('#to-content').offset().top -84
        }, 'slow');
    }
    else{
        $('html, body').animate({
            scrollTop: $('#to-content').offset().top -34
        }, 'slow');
    }
});

$(".sub-scroll").on('click', function(event) {

    var target = $(this.getAttribute('href'));

    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top -84
        }, 1000);
    }

});

/* Header on scroll
===================================================================== */
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var halfWindowHeight = $(window).height() / 4;

    if ($(this).scrollTop() > 300) { // this refers to window
        $('.banner').addClass('animate');
    } else {
        $('.banner').removeClass('animate');
    }


    if ($(window).width() > 768) {
        if (scroll >= 50) {
            $(".transparent-header").addClass("header-bg");
        } else {
            $(".transparent-header").removeClass("header-bg");
        }
    } else {
        $('.transparent-header').removeClass('header-bg');
    }
});

/* Footer visibility
=================================================================== */
$(window).scroll(function() {
    if ($(this).scrollTop() < 500 && screen.width > 768) {
        $("#footer").css({
            'display': 'none'
        });
        //console.log('Footer hidding');
    }
    else {
        $("#footer").css({
            'display': 'block'
        });
        //console.log('Footer showing');
    }
});


/* Team Bio
=================================================================== */

$(".member-bio").click(function () {
    $(this).closest('.member-wrapper').find( ".member-bio-content" ).fadeIn( "slow" );
    $('body').css({
        'overflow': 'hidden'
    });
    if ($(window).width() < 920) {
        $(this).closest('.slick-slider').find( ".slick-arrow" ).fadeOut( "slow" );
    }
});

$(".close").click(function () {
    $(this).closest('.member-wrapper').find( ".member-bio-content" ).fadeOut( "slow" );
    if ($(window).width() < 920) {
        $(this).closest('.slick-slider').find( ".slick-arrow" ).fadeIn( "slow" );
    }
});

$(".bio-wrapper .close").click(function(){
    $('body').css({
        'overflow': 'auto'
    });
});


/* Custom Scrollbar
 =================================================================== */
(function($){
    $(window).on("load",function(){
        if (typeof($(".custom-scroll").mCustomScrollbar) != "undefined"){
            $(".custom-scroll").mCustomScrollbar({
                theme: "inset-dark",
                scrollButtons: {enable:true}
            });
        }
    });
})(jQuery);



$.fn.isVisible = function() {
    // Current distance from the top of the page
    var windowScrollTopView = $(window).scrollTop();

    // Current distance from the top of the page, plus the height of the window
    var windowBottomView = windowScrollTopView + $(window).height();

    // Element distance from top
    var elemTop = $(this).offset().top;

    // Element distance from top, plus the height of the element
    var elemBottom = elemTop + $(this).height();

    return ((elemBottom <= windowBottomView) && (elemTop >= windowScrollTopView));
};

// declare global
var slider_array = new Array();

jQuery(document).ready(function($){

    // launch bxslider
    $('.loc-slider').each(function(i){
        slider_array[i] = $(this).bxSlider({controls:false,  auto: false, pagerCustom: '.bx-pager', mode: 'fade', touchEnabled: false,
            speed: 1000, pause: 10000});
    });


    // bind controls on custom controls, and run functions on every slider
    $('.loc-slider-controls a').bind('click', function(e) {
        e.preventDefault();

        if($(this).hasClass('pull-left')) {
            e.preventDefault();
            $.each(slider_array, function(i,elem){
                elem.goToPrevSlide();
            });

        } else if($(this).hasClass('pull-right')) {
            console.log("right");
            e.preventDefault();
            $.each(slider_array, function(i,elem){
                elem.goToNextSlide();
            });
        }

    });

});