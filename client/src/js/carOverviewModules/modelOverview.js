import { AuthMenu } from "../services/AuthMenuModule.js";
import { PopUpMessage } from "../services/popUpMessage.js";
import {TokenService} from "../services/tokenService.js";
import { UsersBasket } from "../services/usersBasketService.js"

AuthMenu.AuthMenuInit()
new UsersBasket();


class ModelOverview {
    constructor() {
        this.popUpMessage = new PopUpMessage();
        this.modelList = document.querySelector('.modelRow__list');

        this.modelList911 = null;
        this.modelList718 = null

        this.handleShowFiltersMenu();

        this.setHandlers();
    }

    async setHandlers(){
        document.addEventListener('DOMContentLoaded', async () => {
            this.allModels = await this.getAllModels()
            this.modelList911 = this.allModels.filter((modelItem)=> modelItem.model_series === '911')
            this.modelList718 = this.allModels.filter((modelItem)=> modelItem.model_series === '718')

            // Модель из url
            const model = this.getModelFromURL();

            const inputBox = document.querySelector('.radio-series-box[value="' + model  + '"]');
            inputBox.checked = true;

            switch(model){
                case '911': this.innerCarModels(this.modelList911); break;
                case '718': this.innerCarModels(this.modelList718); break;
            }

            this.handleFiltersMenu();
            this.handleSubFilters911Menu();
            this.handleSubFilters718Menu();

        })
    }

    innerCarModels(carsData){
        carsData = carsData.sort((car1, car2) => car1.model_name.localeCompare(car2.model_name));
        const modelListItems = carsData.map(car =>
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

        this.modelList.innerHTML = modelListItems;

        this.handleReviewButton()
    }

    handleReviewButton(){
        const confirmButtonList = document.querySelectorAll('.modelRow__list-item-confirmButton');

        confirmButtonList.forEach((button) => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();

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
                        window.location.href = button.getAttribute('href');
                    }
                    // Если токен не валиден, то делаем новый access токен через refresh токен
                    else{
                        const response = await TokenService.refreshToken();

                        // Если успешно обновлен
                        if (response.ok) {
                            const data = await response.json();
                            localStorage.setItem('token', data.accessToken);
                            window.location.href = button.getAttribute('href');
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

            })
        })
    }

    handleShowFiltersMenu = () => {
        const filterItems = document.querySelectorAll('.filters__series-item');
        const filterLists = document.querySelectorAll('.filters__list');

        filterItems.forEach(filterItem => {
            filterItem.addEventListener('click', (e) => {

                filterLists.forEach(filterList => {
                    filterList.classList.add('hidden');
                });

                const targetList = filterItem.querySelector('.filters__list');
                if (targetList){
                    targetList.classList.remove('hidden');

                    const subFilterInputs = targetList.querySelectorAll('input');
                    subFilterInputs.forEach((filterInput) => {filterInput.checked = false})
                    subFilterInputs[0].checked = true;
                }
            })
        })

    }

    handleSubFilters911Menu = () => {
        const subFilterItems = document.querySelectorAll('.filters__911-item');
        subFilterItems.forEach(filterItem => {
            filterItem.addEventListener('click', (e) => {

                e.stopPropagation();

                const inputBox = filterItem.querySelector('.radio-series-box');
                const inputBoxValue = inputBox.getAttribute('value');

                if (inputBoxValue === 'all') {
                    this.innerCarModels(this.modelList911);
                }
                else{
                    const filteredList = this.modelList911.filter((item) => item.model_name.includes(inputBoxValue));
                    this.innerCarModels(filteredList);
                }
            })
        })
    }
    handleSubFilters718Menu = () => {
        const subFilterItems = document.querySelectorAll('.filters__718-item');
        subFilterItems.forEach(filterItem => {
            filterItem.addEventListener('click', (e) => {

                e.stopPropagation();

                const inputBox = filterItem.querySelector('.radio-series-box');
                const inputBoxValue = inputBox.getAttribute('value');

                if (inputBoxValue === 'all') {
                    this.innerCarModels(this.modelList718);
                }
                else{
                    const filteredList = this.modelList718.filter((item) => item.model_name.includes(inputBoxValue));
                    this.innerCarModels(filteredList);
                }
            })
        })
    }

    handleFiltersMenu(){
        // Выбор элементов списка со всеми фильтрами
        const filtersSeriesLiEl = document.querySelectorAll('.filters__series-item');

        filtersSeriesLiEl.forEach((filtersItem) => {
            filtersItem.addEventListener('click', (e) => {
                const filterInputEl = filtersItem.querySelector('.radio-series-box');
                if (!filterInputEl.checked) {
                    const filterValue = filterInputEl.value;

                    if (filterValue === 'all') {
                        this.innerCarModels(this.allModels)
                    }
                    else{
                        const filteredCarModel = this.allModels.filter(carModel => carModel.model_series === filterValue);
                        this.innerCarModels(filteredCarModel)
                    }
                }

            })
        })
    }

    getAllModels = async () => {
        const url = "http://localhost:3000/API/carModels/allModels";
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

    getModelFromURL(){
        const URLParams = new URLSearchParams(window.location.search);
        return URLParams.get('model')
    }


}
new ModelOverview();

