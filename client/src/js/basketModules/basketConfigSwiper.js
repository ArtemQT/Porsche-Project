const configSwiper = new Swiper('.basket__config-swiper', {
    loop: false,

    initialSlide: 0,
    grabCursor: false,
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
    slideToClickedSlide: true,
    speed: 800,

    navigation: {
        nextEl: '.basket__config-controls-button-next',
        prevEl: '.basket__config-controls-button-prev',
    },
})