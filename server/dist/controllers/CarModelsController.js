"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModelsController = void 0;
const carModelsModel_1 = require("../models/carModelsModel");
class CarModelsController {
    static async getCarModels(req, res) {
        try {
            const model = req.query.model;
            const carModels = await carModelsModel_1.CarModelsModel.getCarModels(model);
            res.status(200).json(carModels);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    static async getAllModels(req, res) {
        try {
            const carModels = await carModelsModel_1.CarModelsModel.getAllCarModels();
            res.status(200).json(carModels);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}
exports.CarModelsController = CarModelsController;
