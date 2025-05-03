import { AuthMenu } from "../services/AuthMenuModule.js";
import { PopUpMessage } from "../services/popUpMessage.js";

AuthMenu.AuthMenuInit()


class ModelOverview {
    carModel;
    modelList = document.querySelector('.modelRow__list')
    modelTitle = document.querySelector('.modelRow-title');
    carsData = null;

    constructor() {
        this.popUpMessage = new PopUpMessage();
        this.setHandlers();
    }

    popUpLogInMessage() {
        this.popUpMessage.show(
            "Authorization required",
            "To continue, you must log in."
        )
    }

    async setHandlers(){
        document.addEventListener('DOMContentLoaded', async () => {
            await this.innerCarModels()
        })
    }

    async innerCarModels(){
        this.carsData = await this.getCarModel()
        this.carsData = this.carsData.sort((car1, car2) => car1.model_name.localeCompare(car2.model_name));
        const modelListItems = this.carsData.map(car =>
            `
                <li class="modelRow__list-item">
                        <div class="modelRow__list-item-FuelType">
                            ${car.fuel_type}
                        </div>

                        <div class="modelRow__list-item-img">
                            <img src=${car.overview_image} alt=""
                                 width="300px"
                                 height="150px">
                        </div>

                        <h3 class="modelRow__list-item-title">
                            ${car.model_series} ${car.model_name}
                        </h3>

                        <ul class="model__row-list-param">
                            <li class="model__row-list-param-item">
                                <div class="model__row-list-param-item-value">
                                    ${car.model_acceleration}
                                </div>
                                <div class="model__row-list-param-item-name">
                                    Acceleration 0 - 100 km/h with Sport Chrono Package
                                </div>
                            </li>
                            <li class="model__row-list-param-item">
                                <div class="model__row-list-param-item-value">
                                    ${car.power_kw_ps}
                                </div>
                                <div class="model__row-list-param-item-name">
                                    Power combined (kW) / Power combined (PS)
                                </div>
                            </li>
                            <li class="model__row-list-param-item">
                                <div class="model__row-list-param-item-value">
                                    ${car.top_speed}
                                </div>
                                <div class="model__row-list-param-item-name">
                                    Top speed
                                </div>
                            </li>
                        </ul>

                        <a href="modelReview.html?model_name=${car.model_name}" class="modelRow__list-item-confirmButton">
                            Confirm selection
                        </a>
                        
                    </li>
            `
        ).join('');

        const modelNameData = `Porsche ${this.getModel()} Models`

        this.modelTitle.innerHTML = modelNameData;
        this.modelList.innerHTML = modelListItems;

        this.handleReviewButton()
    }

    async getCarModel() {
        this.carModel = this.getModel();
        const url = "http://localhost:3000/API/carModels/" + this.carModel + `?model=${this.carModel}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                return await response.json();
            }
        }catch(err) {
            console.log(err);
            throw err;
        }

    }

    getModel(){
        const URLParams = new URLSearchParams(window.location.search);
        return URLParams.get('model')
    }

    handleReviewButton(){
        const confirmButtonList = document.querySelectorAll('.modelRow__list-item-confirmButton');

        confirmButtonList.forEach((button) => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();

                // Проверка существования токена
                const token = localStorage.getItem('token');
                if(!token){
                    this.popUpLogInMessage()
                    return;
                }

                // Верификация токена
                try{
                    const verifyUrl = 'http://localhost:3000/API/verifyJwt'

                    const response = await fetch(verifyUrl, {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    })

                    // Если токен валиден
                    if (response.ok) {
                        window.location.href = button.getAttribute('href');
                    }
                    // Если токен не валиден, то делаем новый access токен через refresh токен
                    else{
                        const refreshUrl = 'http://localhost:3000/API/refreshJwt';
                        const response = await fetch(refreshUrl, {
                            method: "GET",
                            credentials: "include",

                            headers: {
                                "content-type": "application/json",
                            },
                        })

                        // Если успешно обновлен
                        if (response.ok) {
                            const data = await response.json();
                            localStorage.setItem('token', data.accessToken);
                            window.location.href = button.getAttribute('href');
                        }
                        else{
                            this.popUpLogInMessage()
                        }
                    }
                }
                catch(err) {
                    console.log(err);
                }

            })
        })
    }

}
new ModelOverview();

