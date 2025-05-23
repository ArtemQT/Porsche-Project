import { createConnToDataBase } from '../config/CreateConnToDataBase'
import { RowDataPacket } from "mysql2";
import mysql from "mysql2/promise";

export class CarModelsModel {
    static async getCarModels(model: any) {
        const connection = await createConnToDataBase();
        try{
            const [rows] = await connection.execute(
                `SELECT * FROM models 
                 WHERE model_series = ?`, [`${model}`]
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

    static async getAllCarModels() {
        const connection = await createConnToDataBase();
        try{
            const [rows] = await connection.execute(
                `SELECT * FROM models`
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