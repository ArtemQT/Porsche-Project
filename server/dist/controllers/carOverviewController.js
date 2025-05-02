"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarOverviewController = void 0;
const carOverviewModel_1 = require("../models/carOverviewModel");
class CarOverviewController {
    static async getCar(req, res) {
        try {
            const model_name = req.query.model_name;
            const modelData = await carOverviewModel_1.CarOverviewModel.getCar(model_name);
            res.status(200).json(modelData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}
exports.CarOverviewController = CarOverviewController;
