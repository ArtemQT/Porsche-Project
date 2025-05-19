import { SaveConfiguration } from "./saveConfiguration.js";
import { TokenService } from "../services/tokenService.js";
import { PopUpMessage } from "../services/popUpMessage.js";


export let BASE_PRICE = 0;

class ModelReview {

    reviewCarNameTitle = document.querySelector('.review__header-title');
    reviewImgCollection = document.querySelectorAll('.review__swiper-slide-picture img');
    basePriceEl = document.querySelector('.total-price');
    reviewModelSeriesEl = document.querySelector('.review__header-modelSeries');
    saveContainerPreviewImg = document.querySelector('.save-container__preview-img img');

    constructor() {
        this.popUpMessage = new PopUpMessage();
        this.setHandlers();
        SaveConfiguration.handleConfigurationButtons()
    }

    async setHandlers(){
        document.addEventListener('DOMContentLoaded', async () => {
            await this.innerCarData()
        })
    }

    async innerCarData(){

        const carData = await this.getCar();

        localStorage.setItem('modelID', carData.id)

        // Название модели porsche
        this.reviewCarNameTitle.textContent = `${carData.model_series} ${carData.model_name}`;

        // Ряд porsche
        this.reviewModelSeriesEl.textContent = `${carData.model_series}`;

        // Стартовая цена модели
        this.basePriceEl.textContent = `${carData.base_price}`;
        BASE_PRICE = parseInt(carData.base_price);

        // Превью img
        this.reviewImgCollection[0].src = `${carData.preview_images[0]}`;
        this.reviewImgCollection[1].src = `${carData.preview_images[1]}`;

        // Превью сохранения img
        this.saveContainerPreviewImg.src = `${carData.preview_images[1]}`;

    }
    async getCar() {

        const fetchAPI = async () => {
            const carModel = this.getModelName()

            const url = `http://localhost:3000/API/carReview?model_name=${carModel}`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    return data[0];
                }
            }catch(err) {
                console.log(err);
                throw err;
            }
        }

        // Проверка существования токена
        const token = localStorage.getItem('token');
        if(!token){
            this.popUpMessage.show(
                "Authorization required",
                "To continue, you must log in."
            )
            return;
        }

        // Верификация токена
        try{
            const response = await TokenService.verifyToken(token);

            // Если токен валиден
            if (response.ok) {
                return await fetchAPI();
            }
            // Если токен не валиден, то делаем новый access токен через refresh токен
            else{
                const response = await TokenService.refreshToken();

                // Если успешно обновлен
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.accessToken);
                    return await fetchAPI();
                }
                // Если истек refresh токен
                else{
                    this.popUpMessage.show(
                        "Session expired\n",
                        "Your session has expired. Please log in again."
                    )
                    setTimeout(AuthMenu.logOut, 2000)
                }
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    getModelName(){
        const URLParams = new URLSearchParams(window.location.search);
        return URLParams.get('model_name')
    }
}

import { AuthMenu } from "../services/AuthMenuModule.js";
import { UsersBasket } from "../services/usersBasketService.js"

AuthMenu.AuthMenuInit()
new ModelReview()
SaveConfiguration.handleSaveButton()
new UsersBasket();



