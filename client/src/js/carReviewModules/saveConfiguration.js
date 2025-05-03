import { BASE_PRICE } from './modelReview.js'

export class SaveConfiguration {
    constructor() {

    }

    handleSaveButton = () => {
        const saveBtn = document.querySelector('.save-container__confirmBtn');
        saveBtn.addEventListener('click', (e) => {

        })
    }

    static handleConfigurationButtons(){
        const saveBtn = document.querySelector('.save-configuration-btn');
        const saveContainer = document.querySelector('.save-container');
        const reviewSlideCollection = document.querySelectorAll('.review__swiper-slide');
        const constructorControlBtnCollection = document.querySelectorAll('.constructor-control');

        // Настройка кнопки сохранения конфигурации
        saveBtn.addEventListener('click', (e) => {
            // -------------------------------------------------//
            //                  Вычисление цен                  //
            // -------------------------------------------------//

            // Получение итоговой цены
            const totalPriceForSaveElement = document.querySelector('.total-price-for-save');
            const totalPriceConstructorElement = document.querySelector('.total-price');
            totalPriceForSaveElement.textContent = totalPriceConstructorElement.textContent.trim();

            // Получение базовой цены
            const basePriceElement = document.querySelector('.base-price');
            basePriceElement.textContent = BASE_PRICE;

            // Получение цены опций
            const optionsPriceElement = document.querySelector('.options-price');
            optionsPriceElement.textContent = (parseInt(totalPriceConstructorElement.textContent) - BASE_PRICE).toString();

            // -------------------------------------------------//
            //          Отключение работы компонентов           //
            // -------------------------------------------------//
            saveContainer.classList.remove('hidden');

            reviewSlideCollection.forEach((slide) => {
                slide.style.opacity = 0.75;
            })

            // отключение работы пагинации
            const paginationItemCollection = document.querySelectorAll('.constructor-pagination-item');
            paginationItemCollection.forEach((bulletItem) => {
                bulletItem.classList.remove('active-bullet-item');

                const bulletButton =  bulletItem.firstElementChild;
                bulletButton.disabled = true;
            })

            // скрытие меню конструктора
            const constructorSwiperWrapper = document.querySelector('.constructor__swiper-wrapper');
            constructorSwiperWrapper.classList.remove('active-swiper');

            // отключение кнопок скрытия и показа конструктора
            constructorControlBtnCollection.forEach((controlBtn) => {controlBtn.disabled = true;});

        })

        const exitBtn = document.querySelector('.save-container__exit-button');
        exitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            saveContainer.classList.add('hidden');

            reviewSlideCollection.forEach((slide) => {
                slide.style.opacity = 1;
            })

            // включение кнопок скрытия и показа конструктора
            constructorControlBtnCollection.forEach((controlBtn) => {controlBtn.disabled = false;});
        })

    }
}