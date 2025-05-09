"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersBasketModel = void 0;
const CreateConnToDataBase_1 = require("../config/CreateConnToDataBase");
class usersBasketModel {
    static async getConfigByHash(configHash, userID) {
        const connection = await (0, CreateConnToDataBase_1.createConnToDataBase)();
        try {
            const [rows] = await connection.execute(`
            SELECT * FROM users_basket
            WHERE user_id = ? AND config_hash = ?`, [userID, configHash]);
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
    static async insertConfig(config) {
        const connection = await (0, CreateConnToDataBase_1.createConnToDataBase)();
        try {
            await connection.execute(`
            INSERT INTO users_basket (user_id, model_id, config_hash, 
                                      
                                      exterior_color, exterior_color_img, 
                                      interior_color, interior_color_img, 
                                      wheels, wheels_img, 
                                      package_title, package_description, 
                                      exhaust_title, exhaust_description,
                                      model_price)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                config.user_id, config.model_id, config.hashConfig,
                config.exterior_color, config.exterior_color_img,
                config.interior_color, config.interior_color_img,
                config.wheels, config.wheels_img,
                config.package_title, config.package_description,
                config.exhaust_title, config.exhaust_description,
                config.model_price
            ]);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
        finally {
            await connection.end();
        }
    }
    static async getConfig(user_id) {
        const connection = await (0, CreateConnToDataBase_1.createConnToDataBase)();
        try {
            const [rows] = await connection.execute(`
                SELECT * FROM users_basket
                JOIN models ON users_basket.model_id = models.id
                WHERE user_id = ?`, [user_id]);
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
exports.usersBasketModel = usersBasketModel;
