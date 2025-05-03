import { Request, Response } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import { RowDataPacket } from "mysql2";
import { TokenModel } from "../models/tokenModel"
import dotenv from "dotenv";
dotenv.config();

// HTTP 401: клиент не прошёл аутентификацию, и подразумевает, что успешный ответ может быть возвращён после действительной аутентификации,
// HTTP 403: клиенту не разрешён доступ к ресурсу, несмотря на предоставление данных
export class TokenController {
    static async handleRefreshToken(req: Request, res: Response) {

        // Проверка наличия refresh токена в куках
        // Если пользователь не зарегистрирован, то этот код проверяет это
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            res.sendStatus(401);
            return;
        }
        const refreshToken: string = cookies.jwt;

        // Проверка соотв. полученного токена с токеном пользователя
        // Если кто-то пытается подменить токен, то этот код проверяет его действительность
        const users: RowDataPacket[] = await TokenModel.getUserByToken(refreshToken);
        if (users.length === 0) {
            res.sendStatus(403)
            return;
        }

        const foundUser: RowDataPacket = users[0];
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET!,
            (err, dec) => {
                const decoded: JwtPayload = dec as JwtPayload;
                if (err || foundUser.user_name !== decoded.userName) {
                    res.sendStatus(403); // Forbidden
                    return;
                }
                const accessToken: string = jwt.sign(
                    {"userName": decoded.userName},
                    process.env.ACCESS_TOKEN_SECRET!,
                    { expiresIn: "60s" }
                )
                res.status(200).json({
                    accessToken,
                    "message": "Токен успешно обновлен"
                })
            }
        )
    }

    static async handleLogOut(req: Request, res: Response){
        // on client, also delete the accessToken

        const cookies = req.cookies;
        console.log(cookies);
        if (!cookies?.jwt){
            res.status(401).json({ message: 'Unauthorized: No token provided.' });
            return;
        }
        const refreshToken = cookies.jwt;

        const users: RowDataPacket[] = await TokenModel.getUserByToken(refreshToken);
        if (users.length === 0) {
            res.clearCookie('jwt', { httpOnly: true, secure: false });
            res.status(404).json({ message: 'Token not found.' });
            return;
        }

        const foundUser: RowDataPacket = users[0];
        // Delete refreshToken from DataBase
        await TokenModel.logOutByToken(foundUser.id);
        res.clearCookie('jwt', { httpOnly: true, secure: false });
        res.status(200).json({ message: 'Successfully logged out.'});
    }
}



