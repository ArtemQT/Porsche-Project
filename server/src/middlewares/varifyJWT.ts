import { Response, Request, NextFunction } from "express";

import jwt, {JwtPayload, VerifyErrors} from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

interface CustomRequest extends Request{
    userName?: string;
}

export const verifyJwt = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader: string | undefined = req.headers.authorization;
    if (!authHeader) {
        res.sendStatus(401);
        return;
    }
    const token: string = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
        if (err){
            res.sendStatus(403);
            return;
        }
        type TDecodedUserName = { username: string };
        const user: TDecodedUserName = decoded as TDecodedUserName;
        const userName: string = user.username;

        req.userName = user.username;
        next()
    })
}