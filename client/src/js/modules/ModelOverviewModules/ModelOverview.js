export class ModelOverview {
    carModel;
    modelList = document.querySelector('.modelRow__list')
    modelTitle = document.querySelector('.modelRow-title');

    constructor() {
        this.setHandlers();
    }


    async setHandlers(){
        document.addEventListener('DOMContentLoaded', async () => {
            await this.innerCarModels()
        })
    }

    async innerCarModels(){
        let carsData = await this.getCarModel()
        carsData = carsData.sort((car1, car2) => car1.model_name.localeCompare(car2.model_name));
        const modelListItems = carsData.map(car =>
            `
                <li class="modelRow__list-item">
                        <div class="modelRow__list-item-FuelType">
                            ${car.fuel_type}
                        </div>

                        <div class="modelRow__list-item-img">
                            <img src=${car.image_url} alt=""
                                 width="300px"
                                 height="150px">
                        </div>

                        <h3 class="modelRow__list-item-title">
                            ${car.model_name}
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

                        <a href="modelReview.html" class="modelRow__list-item-confirmButton">
                            Confirm selection
                        </a>
                    </li>
            `
        ).join('');

        const modelNameData = `Porsche ${this.getModel()} Models`

        this.modelTitle.innerHTML = modelNameData;
        this.modelList.innerHTML = modelListItems;
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

}