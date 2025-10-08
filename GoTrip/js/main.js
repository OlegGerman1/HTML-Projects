
jQuery(document).ready(function($){

    let owl = $('.owl-carousel');
    owl.owlCarousel({
        center: true,
        loop: true,
        margin: 20,
        startPosition: 0,
        items: 1,
        responsive : {
            500: {
                items: 2,
            },
            1000: {
                items: 3,
                startPosition: 1,
            },
            1200: {
                items: 3,
                margin: 30,
            }
        }
    });

    $('.slider__btn--next').click(function() {
        owl.trigger('next.owl.carousel');
    });
    $('.slider__btn--prev').click(function() {
        owl.trigger('prev.owl.carousel');
    });


    $('.nav__toggle').on('click', function(){
        $('header .nav').toggleClass('nav--mobile');
        $('.menu-icon').toggleClass('menu-icon--active');
        $('body').toggleClass('no-scroll');
    });

});

