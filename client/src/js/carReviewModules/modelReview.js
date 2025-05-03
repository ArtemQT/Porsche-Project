import { SaveConfiguration } from "./saveConfiguration.js";
export let BASE_PRICE = 0;

class ModelReview {

    reviewCarNameTitle = document.querySelector('.review__header-title');
    reviewImgCollection = document.querySelectorAll('.review__swiper-slide-picture img');
    basePriceEl = document.querySelector('.total-price');
    reviewModelSeriesEl = document.querySelector('.review__header-modelSeries');
    saveContainerPreviewImg = document.querySelector('.save-container__preview-img img');

    constructor() {
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
    getModelName(){
        const URLParams = new URLSearchParams(window.location.search);
        return URLParams.get('model_name')
    }
}



import { AuthMenu } from "../services/AuthMenuModule.js";

AuthMenu.AuthMenuInit()

new ModelReview()


