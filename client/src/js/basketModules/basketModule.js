import { AuthMenu } from "../services/AuthMenuModule.js";
import { createConfigSwiper } from "./basketConfigSwiper.js";
import { PopUpMessage } from "../services/popUpMessage.js"
import { TokenService } from "../services/tokenService.js";

class Basket{
    constructor(){
        this.setContentLoadedHandler();

    }

    setContentLoadedHandler = () => {
        const innerContainer = (div) => {
            div.innerHTML = `
            <div class="basket__container container">
                <div class="basket__content">
                    <ul class="basket__list">
                    </ul>
                    <div class="basket__summary-wrapper">
                        <div class="basket__summary">
                            <h3 class="basket__summary-title">
                                Porsche <br>
                                Build Summary
                            </h3>
                            <ul class="basket__summary-list">
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            `
        }

        document.addEventListener('DOMContentLoaded', async () => {
            // Получение section с классом basket
            const basketSection = document.querySelector('.basket');

            // Получение сохраненных конфигураций пользователя
            const userConfig = await this.getUserBasket();

            // Если конфигураций нет
            if (userConfig.length === 0) {
                const div = this.createEmptyBasketContainer()
                basketSection.appendChild(div);
                return;
            }

            const div = document.createElement("div");
            div.classList.add("basket__container");
            div.classList.add("container");
            innerContainer(div);
            basketSection.appendChild(div);

            const userBasketList = document.querySelector('.basket__list');

            // Цикл по массиву конфигураций пользователя
            userConfig.forEach((config)=>{

                // Создание элемента списка и добавление в список
                const liElement = document.createElement('li');
                liElement.classList.add('basket__list-item');
                liElement.id = `${config.config_hash}`

                // Добавление сохраненной карточки модели
                this.innerModelCard(liElement, config);

                // Добавление конфигурации
                this.innerConfigCard(liElement, config);

                // Добавление цены
                this.innerPriceCard(liElement, config);

                // Добавление обработчика кнопке удаления
                const deleteConfigBtn = liElement.querySelector('.basket__item-delete-button');
                this.setDeleteBtnHandler(deleteConfigBtn, config.id);

                // Создание объекта swiper для конфигурации
                const swiperWrapper = liElement.querySelector('.basket__config-swiper');
                createConfigSwiper(swiperWrapper);

                userBasketList.append(liElement);
            })

            // Создание summary карточки
            this.innerSummaryCard(userConfig)
        })
    }

    setDeleteBtnHandler = (deleteBtn, configId) => {
        const popUpMessage = new PopUpMessage();
        const deleteFetch = async () => {
            try{
                const url = `http://localhost:3000/API/userBasket/deleteUserConfig?id=${configId}`
                const response = await fetch(url,{
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                });
                if (response.status === 200) {
                    // Если удаление прошло успешно, то удаляем li из списка и li и summary
                    const deleteLiItem = deleteBtn.closest('.basket__list-item');
                    const id = deleteLiItem.id;
                    deleteLiItem.remove();

                    const deleteLiItemSummary = document.getElementById(id);
                    deleteLiItemSummary.remove()

                    popUpMessage.show(
                        'Deletion Message',
                        'Configuration successfully deleted'
                    )

                    // Если список конфигураций пуст
                    const basketList = document.querySelector('.basket__summary-list');
                    if (basketList.children.length === 0) {
                        const basketContainer = document.querySelector('.basket__container');
                        basketContainer.remove();

                        const basketSection = document.querySelector('.basket');
                        const div = this.createEmptyBasketContainer()
                        basketSection.appendChild(div);

                        window.scroll(0,0)
                    }
                }
            }
            catch(err){
                console.log(err)
            }
        }

        deleteBtn.addEventListener('click', async (e) => {
            const token = localStorage.getItem('token');
            if (!token) {
                popUpMessage.show(
                    "Authorization required",
                    "To continue, you must log in."
                )
                return;
            }

            const response = await TokenService.verifyToken(token);
            if (response.ok){
                await deleteFetch()
            }
            else{
                const response = await TokenService.refreshToken();
                if (response.ok){
                    const data = await response.json();
                    localStorage.setItem('token', data.accessToken);

                    await deleteFetch()
                }
                else{
                    popUpMessage.show(
                        "Session expired",
                        "Your session has expired. Please log in again."
                    )
                    setTimeout(AuthMenu.logOut, 2000)
                }
            }

        })
    }

    getUserBasket = async () => {
        const popUpMessage = new PopUpMessage();
        const fetchBasket = async () => {
            try{
                const url = 'http://localhost:3000/API/userBasket/getUserConfig';
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                });

                const basket = await response.json();
                return basket.userConfig;
            }
            catch(err){
                console.log(err);
            }
        }

        const token = localStorage.getItem('token');
        if (!token) {
            popUpMessage.show(
                "Authorization required",
                "To continue, you must log in."
            )
        }

        const response = await TokenService.verifyToken(token);
        if (response.ok){
            return await fetchBasket()
        }
        else{
            const response = await TokenService.refreshToken();
            if (response.ok){
                const data = await response.json();
                localStorage.setItem('token', data.accessToken);

                return await fetchBasket()
            }
            else{
                popUpMessage.show(
                    "Session expired",
                    "Your session has expired. Please log in again."
                )
            }

        }

    }

    innerModelCard = (liEl, config) => {
        liEl.innerHTML = `
                 <div class="basket__item-card-wrapper">
                     <div class="basket-card__FuelType">
                        ${config.fuel_type}
                     </div>

                     <div class="basket-card__img">
                        <img src='${config.overview_image}' alt=""
                             width="300px"
                             height="150px">
                     </div>

                     <h3 class="basket-card-title">
                        ${config.model_series} ${config.model_name}
                     </h3>

                     <ul class="basket-card__list-param">
                        <li class="basket-card__list-param-item">
                            <div class="basket-card__list-param-item-value">
                                ${config.model_acceleration}
                            </div>
                            <div class="basket-card__list-param-item-name">
                                Acceleration 0 - 100 km/h with Sport Chrono Package
                            </div>
                        </li>
                        <li class="basket-card__list-param-item">
                            <div class="basket-card__list-param-item-value">
                                ${config.power_kw_ps}
                            </div>
                            <div class="basket-card__list-param-item-name">
                                Power combined (kW) / Power combined (PS)
                            </div>
                        </li>
                        <li class="basket-card__list-param-item">
                            <div class="basket-card__list-param-item-value">
                                ${config.top_speed}
                            </div>
                            <div class="basket-card__list-param-item-name">
                                Top speed
                            </div>
                        </li>
                     </ul>
                 </div>
                `
    }

    innerConfigCard = (liEl, config) => {
        liEl.innerHTML += `
            <div class="basket__item-config-container">
                <div class="basket__config-title">
                    Your ${config.model_series} ${config.model_name} Configuration
                </div>
                <div class="basket__config-swiper swiper">
                    <div class="basket__config-swiper-wrapper swiper-wrapper">
                        <!--          Слайд с экстерьером             -->
                        <article class="basket-config__swiper-slide swiper-slide">
                            <h3 class="basket__swiper-slide-info-title swiper-slide-title">
                                Exterior Colour
                            </h3>
                            <figure class="color__swiper-slide-picture">
                                <img src='${config.exterior_color_img}'
                                     alt=""
                                     width="350"
                                     height="130"
                                >
                                <figcaption class="color__swiper-slide-picture-info swiper-slide-info">
                                    ${config.exterior_color}
                                </figcaption>
                            </figure>
                        </article>

                        <!--          Слайд с интерьером          -->
                        <article class="basket-config__swiper-slide swiper-slide">
                            <h3 class="basket__swiper-slide-info-title">
                                Interior Colour
                            </h3>
                            <figure class="interior__swiper-slide-picture">
                                <img src="${config.interior_color_img}"
                                     alt=""
                                     width="400"
                                     height="180"
                                >
                                <figcaption class="interior__swiper-slide-picture-info swiper-slide-info">
                                    ${config.interior_color}
                                </figcaption>
                            </figure>
                        </article>

                        <!--          Слайд с дисками         -->
                        <article class="basket-config__swiper-slide swiper-slide">
                            <h3 class="basket__swiper-slide-info-title">
                                Wheels
                            </h3>
                            <figure class="wheels__swiper-slide-picture">
                                <img src="${config.wheels_img}"
                                     alt=""
                                     width="120"
                                     height="120"
                                >
                                <figcaption class="wheels__swiper-slide-picture-info swiper-slide-info">
                                    ${config.wheels}
                                </figcaption>
                            </figure>
                        </article>

                        <!--          Слайд с пакетом             -->
                        <article class="basket-config__swiper-slide swiper-slide package__slide">
                            <h3 class="basket__swiper-slide-info-title">
                                Porsche package
                            </h3>

                            <div class="package__swiper-slide-info">
                                <h4 class="package__swiper-slide-info-title">
                                    ${config.package_title}
                                </h4>
                                <p class="package__swiper-slide-info-description">
                                    ${config.package_description}
                                </p>
                            </div>
                        </article>

                        <!--          Слайд с выхлопом            -->
                        <article class="basket-config__swiper-slide swiper-slide exhaust__slide">
                            <h3 class="basket__swiper-slide-info-title">
                                Exhaust System
                            </h3>

                            <div class="exhaust__swiper-slide-info">
                                <h4 class="exhaust__swiper-slide-info-title">
                                    ${config.exhaust_title}
                                </h4>
                                <p class="exhaust__swiper-slide-info-description">
                                    ${config.exhaust_description}          
                                </p>
                            </div>
                        </article>
                    </div>

                    <div class="basket__config-controls-button-prev swiper-button-prev">
                    </div>
                    <div class="basket__config-controls-button-next swiper-button-next">
                    </div>
                </div>
            </div>
        `
    }

    innerPriceCard = (liEl, config) => {
        liEl.innerHTML += `
        <div class="basket__item-info">
            <h3 class="basket__item-info-price-title">
                Hover your mouse to see the list of prices
            </h3>
            <div class="basket__item-info-price">
                <h4 class="basket__item-info-title">
                    Price information
                </h4>
                <div class="basket__item-price">
                    <ul class="basket__price-list">
                        <li class="basket__price-list-item">
                            <div class="basket__base-price-info">
                                <div class="basket__base-price-title">
                                    Base price
                                </div>
                                <div class="basket__base-price">
                                    £ <strong><span class="base-price">${config.base_price}</span>.00</strong>
                                </div>
                            </div>
                            </li>
                        <li class="basket__price-list-item">
                            <div class="basket__base-price-info">
                                <div class="basket__base-price-title">
                                    Amount price of selected options
                                </div>
                                <div class="basket__base-price">
                                    £ <strong><span class="options-price">${ config.model_price - config.base_price }</span>.00</strong>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="basket__price-total">
                        <div class="basket__total-price-title">
                            Total Price
                        </div>
                        <div class="basket__total-price">
                            £ <strong><span class="total-price">${config.model_price}</span>.00</strong>
                        </div>
                    </div>
                </div>
            </div>
            <button class="basket__item-delete-button">
                Delete Configuration
                </button>
            </div>
        `
    }

    innerSummaryCard = (userConfigList) => {
        const basketSummaryList = document.querySelector('.basket__summary-list');

        const setBasketSummaryButtonHandler = (button, list) => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                if (list.classList.contains('hidden')) {
                    list.classList.remove('hidden');
                }
                else{
                    list.classList.add('hidden');
                }
            })
        }
        const setBasketLiClickHandler = (item, id) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const elementToScroll = document.getElementById(id);
                elementToScroll.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                })
            })
        }


        userConfigList.forEach((config) => {
            const basketSummaryItem = document.createElement('li');
            basketSummaryItem.classList.add('basket__summary-item');
            basketSummaryItem.id = `${config.config_hash}`

            basketSummaryItem.innerHTML = `
                <div class="basket__summary-car">
                    ${config.model_series} ${config.model_name} 
                </div>
                <div class="basket__summary-price">
                    Total Price: <strong><span class="basket__summary-price-amount">${config.model_price}</span>£</strong>
                </div>

                <button class="basket__summary-button">
                    Configuration Details
                    <img src="./assetsBasket/icons/options-icon.svg" alt=""
                        width="25"
                        height="25"
                        >
                </button>

                <ul class="basket__summary-configuration-list hidden">
                    <li class="basket__summary-configuration-list-item">
                        ${config.exterior_color} Exterior
                    </li>
                    <li class="basket__summary-configuration-list-item">
                        ${config.interior_color} 
                    </li>
                    <li class="basket__summary-configuration-list-item">
                        ${config.wheels}
                    </li>
                    <li class="basket__summary-configuration-list-item">
                        ${config.package_title}
                    </li>
                    <li class="basket__summary-configuration-list-item">
                        ${config.exhaust_title}
                    </li>
                </ul>
            `

            // Добавление обработчика события на кнопку показа конфигурации
            const basketSummaryConfigurationButton = basketSummaryItem.querySelector('.basket__summary-button');
            const basketSummaryConfigurationList = basketSummaryItem.querySelector('.basket__summary-configuration-list')
            setBasketSummaryButtonHandler(basketSummaryConfigurationButton, basketSummaryConfigurationList);

            // Добавление обработчика события на клик по элементу
            setBasketLiClickHandler(basketSummaryItem, config.config_hash)

            basketSummaryList.appendChild(basketSummaryItem)
        })
    }

    createEmptyBasketContainer = () => {
        const div = document.createElement("div");
        div.classList.add("empty-basket-container");
        div.classList.add("container");

        div.innerHTML = `
                <div class="empty-basket-container-message">
                    <h3 class="empty-basket-title">
                        Configuration list is empty
                    </h3>
                    <p class="empty-basket-description">
                        There are no configurations to display.
                    </p>
                </div>
                <a href="landing.html#models" class="empty-basket-link">
                    Choose your range of models in Porsche
                    <img src="assetsBasket/icons/double-arrow.svg"
                         alt=""
                         width="50"
                         height="30"
                         loading="lazy"
                    >
                </a>
            `

        return div;
    }
}

AuthMenu.AuthMenuInit()

new Basket();