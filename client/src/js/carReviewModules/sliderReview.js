const handleConstructorPagination = () => {
    const bulletListItems = document.querySelectorAll('.constructor-pagination-item');

    bulletListItems.forEach((bulletItem) => {
        const bulletButton =  bulletItem.firstElementChild;

        bulletButton.addEventListener('click', () => {
            bulletListItems.forEach((bulletItem) => {
                bulletItem.classList.remove('active-bullet-item');
            })

            bulletItem.classList.add('active-bullet-item');

            const slideIndex = +(bulletButton.getAttribute('data-slide'));
            constructorSwiper.slideTo(slideIndex);
        })
    })

    constructorSwiper.on('slideChange', () => {
        const activeIndex = constructorSwiper.activeIndex;
        bulletListItems.forEach((bulletItem) => {
            bulletItem.classList.remove('active-bullet-item');

            const bulletButton =  bulletItem.firstElementChild;
            if(+(bulletButton.getAttribute('data-slide')) === activeIndex) {
                bulletItem.classList.add('active-bullet-item');
            }
        })
    })
}

const handleConstructorControls = () => {
    const constructorSwiperWrapper = document.querySelector('.constructor__swiper-wrapper');
    const controlShowButton = document.querySelector('.constructor-control-show');
    const controlHideButton = document.querySelector('.constructor-control-close');
    const paginationItemCollection = document.querySelectorAll('.constructor-pagination-item');

    paginationItemCollection.forEach((bulletItem) => {
        const bulletButton =  bulletItem.firstElementChild;
        bulletButton.disabled = true;
    })

    controlShowButton.addEventListener('click', () => {
        constructorSwiperWrapper.classList.remove('hidden');
        paginationItemCollection[0].classList.add('active-bullet-item');
        constructorSwiper.slideTo(0);

        paginationItemCollection.forEach((bulletItem) => {
            const bulletButton =  bulletItem.firstElementChild;
            bulletButton.disabled = false;
        })
        window.scrollTo(0, document.body.scrollHeight);
    })

    controlHideButton.addEventListener('click', () => {

        paginationItemCollection.forEach((bulletItem) => {
            bulletItem.classList.remove('active-bullet-item');

            const bulletButton =  bulletItem.firstElementChild;
            bulletButton.disabled = true;
        })

        constructorSwiperWrapper.classList.add('hidden');

    })
}

function totalPriceControl(globalSwiper, priceSpanClass) {
    const swiper = globalSwiper;

    // Получение предыдущего и текущего слайда
    const prevSlideEl = swiper.slides[swiper.previousIndex];
    const activeSlideEl = swiper.slides[swiper.activeIndex];

    // Получение цены предыдущего слайда
    let prevSlidePrice = prevSlideEl.querySelector(`.${priceSpanClass}`).textContent.trim();
    prevSlidePrice = parseInt(prevSlidePrice);

    // Получение цены текущего слайда
    let activeSlidePrice = activeSlideEl.querySelector(`.${priceSpanClass}`).textContent.trim();
    activeSlidePrice = parseInt(activeSlidePrice);

    // Получение текста из элемента с ценой
    const totalPriceElement = document.querySelector('.total-price');
    let totalPriceData = totalPriceElement.textContent.trim();
    totalPriceData = parseInt(totalPriceData);

    // Изменение итоговой цены
    totalPriceData = totalPriceData - prevSlidePrice + activeSlidePrice;
    totalPriceElement.textContent = totalPriceData.toString();
}



// Слайдер ревью авто
new Swiper('.review__swiper', {
    loop: true,
    speed: 800,

    navigation: {
        nextEl: '.review__swiper-button-next',
        prevEl: '.review__swiper-button-prev',
    }
})

// Слайдер и конструктора
export const constructorSwiper = new Swiper('.constructor__swiper', {
    loop: false,

    initialSlide: 0,
    grabCursor: true,
    slidesPerView: 'auto',
    spaceBetween: 50,
    centeredSlides: true,
    slideToClickedSlide: true,
    speed: 800,
})
handleConstructorPagination()
handleConstructorControls()
// Слайдер экстерьера
export const exteriorSwiper = new Swiper('.color__swiper', {
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

    on:{
        slideChangeTransitionStart: function (){
            this.allowSlideNext = false;
            this.allowSlidePrev = false;
        },
        slideChangeTransitionEnd: function () {
            totalPriceControl(exteriorSwiper, "color-price");
            this.allowSlideNext = true;
            this.allowSlidePrev = true;
        }
    }
})

// Cлайдер дисков
export const wheelsSwiper = new Swiper('.wheels__swiper', {
    loop: false,

    initialSlide: 0,
    grabCursor: false,
    slidesPerView: 3,
    spaceBetween: 10,
    centeredSlides: true,
    slideToClickedSlide: true,
    speed: 800,

    navigation: {
        nextEl: '.wheels-controls-button-next',
        prevEl: '.wheels-controls-button-prev',
    },
    on:{
        slideChangeTransitionStart: function (){
            this.allowSlideNext = false;
            this.allowSlidePrev = false;
        },
        slideChangeTransitionEnd: function () {
            totalPriceControl(wheelsSwiper, "wheels-price");
            this.allowSlideNext = true;
            this.allowSlidePrev = true;
        }
    }
})

// Cлайдер интерьера
export const interiorSwiper = new Swiper('.interior__swiper', {
    loop: false,

    initialSlide: 0,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 50,
    centeredSlides: true,
    slideToClickedSlide: true,
    speed: 800,

    navigation: {
        nextEl: '.interior-controls-button-next',
        prevEl: '.interior-controls-button-prev',
    },
    on:{
        slideChangeTransitionStart: function (){
            this.allowSlideNext = false;
            this.allowSlidePrev = false;
        },
        slideChangeTransitionEnd: function () {
            totalPriceControl(interiorSwiper, "interior-price");
            this.allowSlideNext = true;
            this.allowSlidePrev = true;
        }
    }
})

// Слайдер пакетов
export const packageSwiper = new Swiper('.package__swiper', {
    loop: false,

    initialSlide: 0,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 50,
    centeredSlides: true,
    slideToClickedSlide: true,
    speed: 800,

    navigation: {
        nextEl: '.package-controls-button-next',
        prevEl: '.package-controls-button-prev',
    },

    on:{
        slideChangeTransitionStart: function (){
            this.allowSlideNext = false;
            this.allowSlidePrev = false;
        },
        slideChangeTransitionEnd: function () {
            totalPriceControl(packageSwiper, "package-price");
            this.allowSlideNext = true;
            this.allowSlidePrev = true;
        }
    }
})

// Слайдер выхлопов
export const exhaustSwiper = new Swiper('.exhaust__swiper', {
    loop: false,

    initialSlide: 0,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 50,
    centeredSlides: true,
    slideToClickedSlide: true,
    speed: 800,

    navigation: {
        nextEl: '.exhaust-controls-button-next',
        prevEl: '.exhaust-controls-button-prev',
    },

    on:{
        slideChangeTransitionStart: function (){
            this.allowSlideNext = false;
            this.allowSlidePrev = false;
        },
        slideChangeTransitionEnd: function () {
            totalPriceControl(exhaustSwiper, "exhaust-price");
            this.allowSlideNext = true;
            this.allowSlidePrev = true;
        }
    }
})

const constructorSwiperWrapper = document.querySelector('.constructor__swiper-wrapper');
constructorSwiperWrapper.classList.add('hidden');

