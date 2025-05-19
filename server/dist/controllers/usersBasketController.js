"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersBasketController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersBasketModel_1 = require("../models/usersBasketModel");
const hashConfig_1 = require("../services/hashConfig");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class usersBasketController {
    static async addConfig(req, res) {
        try {
            // Получение id пользователя через JWT токен
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user_id = decoded.user_id;
            console.log("decoded: ", decoded);
            // Получение тела запроса
            const { model_id, config } = req.body;
            // Получение хеша конфигурации
            const hashConfig = (0, hashConfig_1.getConfigHash)(config);
            // Проверка на существование у пользователя такой конфигурации
            const usersConfigs = await usersBasketModel_1.usersBasketModel.getConfigByHash(hashConfig, user_id);
            // Если существует такая конфигурация
            if (usersConfigs.length !== 0) {
                // Конфликт с текущим состоянием ресурса
                res.status(409).json({
                    message: `Configuration already exists in account`,
                });
                return;
            }
            // Добавление конфигурации в БД
            const userConfigInfo = {
                user_id,
                model_id,
                hashConfig,
                ...config
            };
            await usersBasketModel_1.usersBasketModel.insertConfig(userConfigInfo);
            // Если запись успешно добавлена
            res.status(201).json({
                message: `Configuration successfully saved in your collection`,
            });
            return;
        }
        catch (err) {
            res
                .status(500)
                .json({
                "statusCode": 500,
                "message": `Server Error ${err.message}`,
            });
            return;
        }
    }
    static async getUserConfig(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user_id = decoded.user_id;
            const userConfig = await usersBasketModel_1.usersBasketModel.getConfig(user_id);
            res.status(200).json({
                message: `Basket successfully delivered`,
                userConfig
            });
        }
        catch (err) {
            res
                .status(500)
                .json({
                "statusCode": 500,
                "message": `Server Error ${err.message}`,
            });
            return;
        }
    }
    static async deleteConfig(req, res) {
        try {
            // Получение id пользователя через JWT токен
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user_id = decoded.user_id;
            // Получение id конфигурации из query параметры
            const config_id = parseInt(req.query.id);
            // Удаление конфигурации пользователя
            await usersBasketModel_1.usersBasketModel.deleteConfigModel(config_id, user_id);
            res.status(200).json({
                message: `Configuration successfully deleted`,
            });
        }
        catch (err) {
            res
                .status(500)
                .json({
                "statusCode": 500,
                "message": `Server Error ${err.message}`,
            });
            return;
        }
    }
}
exports.usersBasketController = usersBasketController;
