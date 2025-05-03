import { Response, Request, NextFunction } from "express";

import jwt, {JwtPayload, VerifyErrors} from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();


// HTTP 401: клиент не прошёл аутентификацию, и подразумевает, что успешный ответ может быть возвращён после действительной аутентификации,
// HTTP 403: клиенту не разрешён доступ к ресурсу, несмотря на предоставление данных
export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader: string | undefined = req.headers.authorization;

    // Если не отправлен заголовок authorization
    if (!authHeader) {
        res.status(401).json({ message: "No token provided" });
        return;
    }

    // Получение и верификация JWT токена
    const token: string = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
        if (err){
            res.status(403).json({ message: "Invalid token" });
            return;
        }

        res.sendStatus(200);
        return;
    })
}