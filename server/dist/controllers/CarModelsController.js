"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModelsController = void 0;
const CarsModelsModel_1 = require("../models/CarsModelsModel");
class CarModelsController {
    static async get911CarModels(req, res) {
        try {
            const carModels = await CarsModelsModel_1.CarModelsModel.get911CarModels();
            res.status(200).json(carModels);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}
exports.CarModelsController = CarModelsController;
