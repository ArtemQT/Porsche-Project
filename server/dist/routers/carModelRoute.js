"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carModelsRouter = void 0;
const express_1 = __importDefault(require("express"));
const carModelsController_1 = require("../controllers/carModelsController");
exports.carModelsRouter = express_1.default.Router();
exports.carModelsRouter.get('/911', carModelsController_1.CarModelsController.getCarModels);
exports.carModelsRouter.get('/718', carModelsController_1.CarModelsController.getCarModels);
exports.carModelsRouter.get('/allModels', carModelsController_1.CarModelsController.getAllModels);
