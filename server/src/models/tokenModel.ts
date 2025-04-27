import { createConnToDataBase } from "../config/CreateConnToDataBase";
import { RowDataPacket } from "mysql2";

export class TokenModel {
    static async updateRefreshToken(token: string, id: BigInt): Promise<void> {
        const connection = await createConnToDataBase();
        try{
            await connection.execute(`
            UPDATE users
            SET refresh_token = ? 
            WHERE id = ?;
        `,[token, id]);
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }

    static async getUserByToken(token: string): Promise<RowDataPacket[]>{
        const connection = await createConnToDataBase();
        try{
            const [user] = await connection.execute<RowDataPacket[]>(
                `SELECT * FROM users WHERE refresh_token = ?`, [token]);
            return user;
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }

    static async logOutByToken(id: string): Promise<void> {
        const connection = await createConnToDataBase();
        try{
            await connection.execute(`
            UPDATE users
            SET refresh_token = ?
            WHERE id = ?
            `, [null, id]);
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }
}



