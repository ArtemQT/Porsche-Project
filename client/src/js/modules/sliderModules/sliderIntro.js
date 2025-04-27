new Swiper('.introCars__swiper-container', {
    loop: true,
    grabCursor: true,
    slidesPerView: 3,
    spaceBetween: 0,
    centeredSlides: false,
    slideToClickedSlide: true,
    autoHeight: true,
    freeMode: true,

    autoplay: {
        delay: 1000,
        stopOnLastSlide: true,
    },

    speed: 800,

    effect: 'coverflow',
    coverflowEffect: {
        rotate: 10,
        stretch: 50,
    }

})