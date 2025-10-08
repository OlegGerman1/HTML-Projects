jQuery(document).ready( function($){

    $('.slider').slick({
        dots: true,
        slidesToShow: 5,
        customPaging: function(){
            return '<span class="custom-dot"></span>';
        },
        prevArrow: $('.arrow-left'),
        nextArrow: $('.arrow-right'),

        appendDots: $('.slider-nav .slick-dots'),
        appendArrows: $('.slider-nav'),
        responsive: [
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 4,
            }
        },
        {
        breakpoint: 1100,
            settings: {
                slidesToShow: 3,
            }
        },
        {
        breakpoint: 830,
            settings: {
                slidesToShow: 2,
            }
        },
        {
        breakpoint: 578,
            settings: {
                slidesToShow: 1,
            }
        },
        
        ]
    });

    $('#popup__button').on('click', function(){
        $('#popup').addClass('active');
        $('body').addClass('lock');
    });

    $('.popup__body').on('click', function(e){
        e.stopPropagation();
    });

    $('#popup__close, #popup').on('click', function(){
        $('#popup').removeClass('active');
        $('body').removeClass('lock');
    });

    $('body').on('click', '.header__burger', function(){
        $('.header__burger, .header__nav-btn').toggleClass('active');
        $('body').toggleClass('lock');
    });

    (function () {
        const header = document.querySelector('.header');
        window.onscroll = () => {
            if (window.pageYOffset > 50) {
                header.classList.add('header--active');
            } else {
                header.classList.remove('header--active');
            }
        };
    }());


    (function () {
        const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);
    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        const menu = document.querySelector('.header__nav-btn');
        const body = document.querySelector('body');
        const burger = document.querySelector('.header__burger');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 500);
                menu.classList.remove('active');
                burger.classList.remove('active');
                body.classList.remove('lock');
            });
        });
    };
    scrollTo();
    }());

});
