"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModelsController = void 0;
const CarsModelsModel_1 = require("../models/CarsModelsModel");
class CarModelsController {
    static async getCarModels(req, res) {
        try {
            const model = req.query.model;
            const carModels = await CarsModelsModel_1.CarModelsModel.getCarModels(model);
            res.status(200).json(carModels);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}
exports.CarModelsController = CarModelsController;
