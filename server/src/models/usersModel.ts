import { userInterface } from "../interface's/userInterface";
import { createConnToDataBase } from "../config/CreateConnToDataBase";
import {ResultSetHeader, RowDataPacket} from "mysql2"

export class UsersModel {

    static async getUserByEmail(email: string): Promise<RowDataPacket[]>{
        let connection = await createConnToDataBase();
        try{
            const [rows] = await connection.execute<RowDataPacket[]>(`
        SELECT id, user_name, user_surname, user_email, user_password FROM users WHERE user_email = ?
        `, [email])
            return rows;
        }
        catch(err: any){
            console.error(err);
            throw err;
        }
        finally{
            await connection.end()
        }
    }

    static async createUserModel(user: userInterface): Promise<ResultSetHeader> {
        const connection = await createConnToDataBase();
        try{
            const [rows] = await connection.execute<ResultSetHeader>(`
        INSERT INTO users (user_name, user_surname, user_email, user_password)
        VALUES (?, ?, ?, ?)
        `, [user.userName, user.userSurname,user.userEmail,user.userPassword]);
            return rows;
        }
        catch(err: any){
            console.error(err);
            return err;
        }
        finally{
            await connection.end();
        }
    }

    static async getAllUsersModel(): Promise<RowDataPacket[]>{
        const connection = await createConnToDataBase();
        try {
            const [rows] = await connection.execute<RowDataPacket[]>(`SELECT * FROM users`)
            return rows;
        }
        catch(err: any){
            throw err;
        }
        finally{
            await connection.end();
        }
    }
}

//API/users/auth/register, Функция для middleware проверки существования пользователя

