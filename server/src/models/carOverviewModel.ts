import { createConnToDataBase } from '../config/CreateConnToDataBase'
import { RowDataPacket } from "mysql2";
import mysql from "mysql2/promise";

export class CarOverviewModel {
    static async getCar(model_name: any) {
        const connection = await createConnToDataBase();
        try{
            const [rows] = await connection.execute(
                `SELECT models.model_name, models.model_series, models_overview.base_price, models_overview.preview_images
                 FROM models_overview
                 INNER JOIN porsche_database.models on models_overview.model_id = models.id
                 WHERE models.model_name = ?`,
                 [model_name]
            )
            return rows;
        }
        catch(err){
            console.log(err);
            throw err;
        }
        finally {
            await connection.end();
        }
    }
}