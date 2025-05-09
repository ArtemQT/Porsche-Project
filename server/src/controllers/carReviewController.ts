import { Request, Response } from "express";
import { CarReviewModel } from "../models/carReviewModel";
export class CarReviewController {
    static async getCar(req: Request, res: Response){
        try {
            const model_name: any = req.query.model_name;
            const modelData = await CarReviewModel.getCar(model_name);

            res.status(200).json(modelData);
        }
        catch(err){
            res.status(500).json(err)
        }
    }
}