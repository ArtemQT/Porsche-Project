import { Request, Response } from "express";
import { CarOverviewModel } from "../models/carOverviewModel";
export class CarOverviewController{
    static async getCar(req: Request, res: Response){
        try {
            const model_name: any = req.query.model_name;
            const modelData = await CarOverviewModel.getCar(model_name);

            res.status(200).json(modelData);
        }
        catch(err){
            res.status(500).json(err)
        }
    }
}