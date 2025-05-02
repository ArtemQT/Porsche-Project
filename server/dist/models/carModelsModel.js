"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModelsModel = void 0;
const CreateConnToDataBase_1 = require("../config/CreateConnToDataBase");
class CarModelsModel {
    static async getCarModels(model) {
        const connection = await (0, CreateConnToDataBase_1.createConnToDataBase)();
        try {
            const [rows] = await connection.execute(`SELECT * FROM models 
                 WHERE model_series = ?`, [`${model}`]);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
        finally {
            await connection.end();
        }
    }
}
exports.CarModelsModel = CarModelsModel;
