"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carReviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const carReviewController_1 = require("../controllers/carReviewController");
exports.carReviewRouter = express_1.default.Router();
exports.carReviewRouter.get('/', carReviewController_1.CarReviewController.getCar);
