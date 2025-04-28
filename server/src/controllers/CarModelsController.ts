import { Request, Response } from "express";
import { CarModelsModel } from "../models/CarsModelsModel";

export class CarModelsController {
    static async get911CarModels(req: Request, res: Response ) {
        try {
            const carModels = await CarModelsModel.get911CarModels()
            res.status(200).json(carModels)
        }
        catch(err) {
            res.status(500).json(err)
        }
    }
}