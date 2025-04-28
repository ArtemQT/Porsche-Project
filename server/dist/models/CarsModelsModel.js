"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModelsModel = void 0;
const CreateConnToDataBase_1 = require("../config/CreateConnToDataBase");
class CarModelsModel {
    static async get911CarModels() {
        const connection = await (0, CreateConnToDataBase_1.createConnToDataBase)();
        try {
            const [rows] = await connection.execute(`SELECT * FROM porsche_models 
                 WHERE model_name LIKE '911%'`);
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
