"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carModelsRouter = void 0;
const express_1 = __importDefault(require("express"));
const CarModelsController_1 = require("../controllers/CarModelsController");
exports.carModelsRouter = express_1.default.Router();
exports.carModelsRouter.get('/911', CarModelsController_1.CarModelsController.get911CarModels);
