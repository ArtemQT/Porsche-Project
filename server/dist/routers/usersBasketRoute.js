"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersBasketRouter = void 0;
const express_1 = __importDefault(require("express"));
const usersBasketController_1 = require("../controllers/usersBasketController");
exports.usersBasketRouter = express_1.default.Router();
exports.usersBasketRouter.post('/addConfig', usersBasketController_1.usersBasketController.addConfig);
exports.usersBasketRouter.get('/getUserConfig', usersBasketController_1.usersBasketController.getUserConfig);
exports.usersBasketRouter.delete('/deleteUserConfig', usersBasketController_1.usersBasketController.deleteConfig);
