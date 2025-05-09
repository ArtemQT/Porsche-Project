"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarReviewController = void 0;
const carReviewModel_1 = require("../models/carReviewModel");
class CarReviewController {
    static async getCar(req, res) {
        try {
            const model_name = req.query.model_name;
            const modelData = await carReviewModel_1.CarReviewModel.getCar(model_name);
            res.status(200).json(modelData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}
exports.CarReviewController = CarReviewController;
