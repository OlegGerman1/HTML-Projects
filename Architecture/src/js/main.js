import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiper = new Swiper('.project__slider', {
    loop: true,
    navigation: {
        nextEl: '.project__arrow-next',
        prevEl: '.project__arrow-prev',
    },
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
        640: {
          spaceBetween: 20,
          slidesPerView: 2,
        },
        1110: {
          slidesPerView: 3,
        },
      },
});

const menuBtn = document.querySelector('.menu__btn');
const menu = document.querySelector('.menu__list');
const body = document.querySelector('body');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuBtn.classList.toggle('active');
    body.classList.toggle('lock');
});