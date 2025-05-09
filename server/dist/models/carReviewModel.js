"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarReviewModel = void 0;
const CreateConnToDataBase_1 = require("../config/CreateConnToDataBase");
class CarReviewModel {
    static async getCar(model_name) {
        const connection = await (0, CreateConnToDataBase_1.createConnToDataBase)();
        try {
            const [rows] = await connection.execute(`SELECT models.model_name, models.model_series, models_overview.base_price, models_overview.preview_images, models.id
                 FROM models_overview
                 INNER JOIN porsche_database.models on models_overview.model_id = models.id
                 WHERE models.model_name = ?`, [model_name]);
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
exports.CarReviewModel = CarReviewModel;
