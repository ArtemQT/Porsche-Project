import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { usersBasketModel } from "../models/usersBasketModel";
import { getConfigHash } from "../services/hashConfig";

import dotenv from "dotenv";
import {RowDataPacket} from "mysql2";
dotenv.config();

import { usersBasketRowInterface } from "../interface's/configInterface";

export class usersBasketController{
    static async addConfig(req: Request, res: Response){
        try {
            // Получение id пользователя через JWT токен
            const token: string = req.headers.authorization!.split(" ")[1];
            const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
            const user_id: number = decoded.user_id;

            console.log("decoded: ", decoded);
            // Получение тела запроса
            const { model_id, config } = req.body;

            // Получение хеша конфигурации
            const hashConfig: string = getConfigHash(config);

            // Проверка на существование у пользователя такой конфигурации
            const usersConfigs: RowDataPacket[] = await usersBasketModel.getConfigByHash(hashConfig, user_id);
            // Если существует такая конфигурация
            if (usersConfigs.length !== 0){
                // Конфликт с текущим состоянием ресурса
                res.status(409).json({
                    message: `Configuration already exists in account`,
                })
                return;
            }

            // Добавление конфигурации в БД
            const userConfigInfo: usersBasketRowInterface = {
                user_id,
                model_id,
                hashConfig,
                ...config
            }
            await usersBasketModel.insertConfig(userConfigInfo);

            // Если запись успешно добавлена
            res.status(201).json({
                message: `Configuration successfully saved in your collection`,
            })
            return;
        }
        catch (err: any){
            res
                .status(500)
                .json({
                    "statusCode": 500,
                    "message" : `Server Error ${err.message}`,
                })
            return;
        }
    }

    static async getUserConfig(req: Request, res: Response){
        try{
            const token: string = req.headers.authorization!.split(" ")[1];
            const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
            const user_id: number = decoded.user_id;

            const userConfig: any = await usersBasketModel.getConfig(user_id)
            res.status(200).json({
                message: `Basket successfully delivered`,
                userConfig
            })
        }
        catch(err: any){
            res
                .status(500)
                .json({
                    "statusCode": 500,
                    "message" : `Server Error ${err.message}`,
                })
            return;
        }
    }

    static async deleteConfig(req: Request, res: Response){
        try{
            // Получение id пользователя через JWT токен
            const token: string = req.headers.authorization!.split(" ")[1];
            const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
            const user_id: number = decoded.user_id;

            // Получение id конфигурации из query параметры
            const config_id: number = parseInt(<string>req.query.id);

            // Удаление конфигурации пользователя
            await usersBasketModel.deleteConfigModel(config_id, user_id);

            res.status(200).json({
                message: `Configuration successfully deleted`,
            })
        }
        catch(err: any){
            res
                .status(500)
                .json({
                    "statusCode": 500,
                    "message" : `Server Error ${err.message}`,
                })
            return;
        }
    }
}