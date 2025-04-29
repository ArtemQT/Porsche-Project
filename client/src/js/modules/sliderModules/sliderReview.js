
new Swiper('.review__swiper', {
    loop: true,
    speed: 800,

    navigation: {
        nextEl: '.review__swiper-button-next',
        prevEl: '.review__swiper-button-prev',
    }
})

new Swiper('.constructor__swiper', {
    loop: false,

    initialSlide: 0,
    grabCursor: true,
    slidesPerView: 'auto',
    spaceBetween: 50,
    centeredSlides: true,
    slideToClickedSlide: true,
    speed: 800,
})

new Swiper('.color__swiper', {
    loop: false,

    initialSlide: 0,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 50,
    centeredSlides: true,
    slideToClickedSlide: true,
    speed: 800,

    navigation: {
        nextEl: '.constructor-controls-button-next',
        prevEl: '.constructor-controls-button-prev',
    },

    on: {
        slideChangeTransitionEnd: function () {
            debugger;
            const costElement = document.querySelector(".constructor__swiper-slide-info-description");
            const activeSlide = document.querySelector(".color__swiper-wrapper .swiper-slide-active");
            const colorName = activeSlide?.querySelector(".color__swiper-slide-picture-info")?.textContent.trim();

            // Удаляем предыдущий span, если есть
            const prevSpan = costElement?.previousElementSibling;
            if (prevSpan?.classList.contains("constructor__swiper-slide-span")) {
                prevSpan.remove();
            }

            // Устанавливаем цену и добавляем описание, если цвет "Ice Grey Metallic"
            if (colorName === "Ice Grey Metallic") {
                costElement.textContent = "+0";
                costElement.insertAdjacentHTML("beforebegin",
                    '<span class="constructor__swiper-slide-span">Base Colour / No Additional Cost</span>');
            } else {
                costElement.textContent = "+5500";
            }
        }
    }
})
