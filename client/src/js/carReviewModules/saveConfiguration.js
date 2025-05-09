import { BASE_PRICE } from './modelReview.js'
import{
    exteriorSwiper,
    interiorSwiper,
    wheelsSwiper,
    packageSwiper,
    exhaustSwiper
} from './sliderReview.js'

import { PopUpMessage } from "../services/popUpMessage.js";
import { AuthMenu } from "../services/AuthMenuModule.js";
import { TokenService } from "../services/tokenService.js";

export class SaveConfiguration {



    static handleSaveButton = () => {
        const saveBtn = document.querySelector('.save-container__confirmBtn');

        saveBtn.addEventListener('click', async (e) => {

            // --------------------------------------------------------------------------------------------------//
            //                  Получение активных слайдов и информации выбранной пользователем                  //
            // --------------------------------------------------------------------------------------------------//

            //                           Работа с активным слайдом ЭКСТЕРЬЕРА                                    //

            // Получение выбранного слайда
            const exteriorChosenSlide = exteriorSwiper.slides[exteriorSwiper.activeIndex]
            // Получение выбранного изображения и описания
            const exteriorChosenImg = exteriorChosenSlide.querySelector('.color__swiper-slide-picture img');
            const exteriorChosenCaption = exteriorChosenSlide.querySelector('.color__swiper-slide-picture figcaption');

            // Сохранение в JSON изображения и описания
            const exterior = {
                "exterior_color" : exteriorChosenCaption.textContent.trim(),
                "exterior_color_img": exteriorChosenImg.getAttribute('src'),
            }

            //                           Работа с активным слайдом ИНТЕРЬЕРА                                     //

             // Получение выбранного слайда
            const interiorChosenSlide = interiorSwiper.slides[interiorSwiper.activeIndex]
            // Получение выбранного изображения и описания
            const interiorChosenImg = interiorChosenSlide.querySelector('figure img');
            const interiorChosenCaption = interiorChosenSlide.querySelector('figure figcaption');

            // Сохранение в JSON изображения и описания
            const interior = {
                "interior_color" : interiorChosenCaption.textContent.trim(),
                "interior_color_img": interiorChosenImg.getAttribute('src'),
            }

            //                           Работа с активным слайдом ДИСКОВ                                        //

             // Получение выбранного слайда
            const wheelsChosenSlide = wheelsSwiper.slides[wheelsSwiper.activeIndex]
            // Получение выбранного изображения и описания
            const wheelsChosenImg = wheelsChosenSlide.querySelector('.wheels__swiper-slide-picture img');
            const wheelsChosenCaption = wheelsChosenSlide.querySelector('.wheels__swiper-slide-picture figcaption');

            // Сохранение в JSON изображения и описания
            const wheels = {
                "wheels" : wheelsChosenCaption.textContent.trim(),
                "wheels_img": wheelsChosenImg.getAttribute('src'),
            }

            //                           Работа с активным слайдом ПАКЕТОВ                                       //

            // Получение выбранного слайда
            const packageChosenSlide = packageSwiper.slides[packageSwiper.activeIndex]
            // Получение выбранного изображения и описания
            const packageChosenTitle = packageChosenSlide.querySelector('.package__swiper-slide-title');
            const packageChosenCaption = packageChosenSlide.querySelector('.package__swiper-slide-description');

            // Сохранение в JSON изображения и описания
            const carPackage = {
                "package_title" : packageChosenTitle.textContent.trim(),
                "package_description": packageChosenCaption.textContent.trim().replace(/\s+/g, ' '),
            }

            //                           Работа с активным слайдом ВЫХЛОПА                                       //

            // Получение выбранного слайда
            const exhaustChosenSlide = exhaustSwiper.slides[exhaustSwiper.activeIndex]
            // Получение выбранного изображения и описания
            const exhaustChosenTitle = exhaustChosenSlide.querySelector('.exhaust__swiper-slide-title');
            const exhaustChosenCaption = exhaustChosenSlide.querySelector('.exhaust__swiper-slide-description');

            // Сохранение в JSON изображения и описания
            const exhaust = {
                "exhaust_title" : exhaustChosenTitle.textContent.trim(),
                "exhaust_description": exhaustChosenCaption.textContent.trim().replace(/\s+/g, ' '),
            }

            //                           Получение итоговой цены конфигурации                                    //

            const modelPriceEl = document.querySelector('.total-price-for-save')
            const model_price = parseInt(modelPriceEl.textContent)

            // Итоговая конфигурация
            const config = {
                exterior_color: exterior.exterior_color,
                exterior_color_img: exterior.exterior_color_img,

                interior_color: interior.interior_color,
                interior_color_img: interior.interior_color_img,

                wheels: wheels.wheels,
                wheels_img: wheels.wheels_img,

                package_title: carPackage.package_title,
                package_description: carPackage.package_description,

                exhaust_title: exhaust.exhaust_title,
                exhaust_description: exhaust.exhaust_description,

                model_price: model_price,
            }

            const model_id = localStorage.getItem('modelID');

            const popUpMessage = new PopUpMessage();

            // Функция для запроса к API для сохранения в корзину
            const requestToAddConfigAPI = async () => {
                // Запрос к API для сохранения в корзину
                try{
                    const apiURL = "http://localhost:3000/API/userBasket/addConfig";
                    const bodyJSON = {
                        model_id,
                        config,
                    }

                    const response = await fetch(apiURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                        body: JSON.stringify(bodyJSON),
                    });

                    const data = await response.json();
                    console.log(data);

                    // Если конфигурация успешно добавлена
                    if(response.ok){
                        popUpMessage.show(
                            'Success',
                            'Configuration successfully saved, thanks'
                        )
                    }
                    // Если такая конфигурация уже существует
                    else if (response.status === 409){
                        popUpMessage.show(
                            'Save conflict',
                            'This configuration already exists in your account'
                        )
                    }
                }
                catch(error){
                    console.log(error)
                }
            }

            // Верификация токена
            const token = localStorage.getItem('token');
            if(!token){
                popUpMessage.show(
                    "Authorization required",
                    "To continue, you must log in."
                )
                return
            }

            try{
                const response = await TokenService.verifyToken(token);

                // Если токен валиден, то сохранение в корзину
                if (response.ok){
                    await requestToAddConfigAPI();
                }

                // Если не валиден, то попытка обновления
                else{
                    const response = await TokenService.refreshToken();
                    // Если успешно обновлен
                    if(response.ok){
                        const data = await response.json();
                        localStorage.setItem('token', data.accessToken);
                        await requestToAddConfigAPI();
                    }
                    else{
                        popUpMessage.show(
                            "Session expired\n",
                            "Your session has expired. Please log in again."
                        )
                        setTimeout(AuthMenu.logOut, 2000)
                    }
                }
            }
            catch(error){
                console.log(error)
            }
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
            constructorSwiperWrapper.classList.add('hidden');

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