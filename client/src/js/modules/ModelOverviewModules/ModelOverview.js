export class ModelOverview {
    constructor(model) {
        this.carModel = model;

        this.setHandlers();
    }

    async setHandlers(){
        document.addEventListener('DOMContentLoaded', async () => {
            await this.innerCarModels()
        })
    }

    async innerCarModels(){
        const modelList = document.querySelector('.modelRow__list')
        debugger
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

                        <a href="" class="modelRow__list-item-confirmButton">
                            Confirm selection
                        </a>
                    </li>
            `
        ).join('');

        modelList.innerHTML = modelListItems;
    }

    async getCarModel() {
        const url = "http://localhost:3000/API/carModels/" + this.carModel;
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
}