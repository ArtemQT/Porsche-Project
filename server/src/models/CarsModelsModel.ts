import { createConnToDataBase } from '../config/CreateConnToDataBase'
import { RowDataPacket } from "mysql2";
import mysql from "mysql2/promise";

export class CarModelsModel {
    static async get911CarModels() {
        const connection = await createConnToDataBase();
        try{
            const [rows] = await connection.execute(
                `SELECT * FROM porsche_models 
                 WHERE model_name LIKE '911%'`
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