export function createConfigSwiper(swiperContainer){
    const configSwiper = new Swiper(swiperContainer , {
        loop: false,

        initialSlide: 0,
        grabCursor: false,
        slidesPerView: 1,
        spaceBetween: 10,
        centeredSlides: true,
        slideToClickedSlide: true,
        speed: 800,

        navigation: {
            nextEl: swiperContainer.querySelector('.basket__config-controls-button-next'),
            prevEl: swiperContainer.querySelector('.basket__config-controls-button-prev'),
        },
    })
}

