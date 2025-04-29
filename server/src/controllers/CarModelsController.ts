import { Request, Response } from "express";
import { CarModelsModel } from "../models/CarsModelsModel";

export class CarModelsController {
    static async getCarModels(req: Request, res: Response) {
        try {
            const model: any = req.query.model;

            const carModels = await CarModelsModel.getCarModels(model)
            res.status(200).json(carModels)
        }
        catch(err) {
            res.status(500).json(err)
        }
    }

}