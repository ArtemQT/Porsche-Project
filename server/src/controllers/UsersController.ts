import {userInterface} from "../interface's/userInterface";
import {Request, Response} from "express";
import { UsersModel } from "../models/usersModel"
import { hashPassword } from "../services/hashPassword";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { TokenModel } from "../models/tokenModel"
dotenv.config();


export class AuthenticateUser {
    static async createUser(req: Request, res: Response): Promise<void> {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                        errors: errors.array()
                    })
            }

            const { userName, userSurname, userEmail, userPassword } = req.body;

            const candidate: RowDataPacket[] = await UsersModel.getUserByEmail(userEmail);
            if (candidate.length != 0){
                 res.status(409).json({
                        "statusCode": 409,
                        "message": "User with this email already exists",
                    })
            }

            const userData: userInterface = {
                userName,
                userSurname,
                userEmail,
                userPassword: await hashPassword(userPassword)
            }

            const rows: ResultSetHeader = await UsersModel.createUserModel(userData);
            res.status(201).json({
                    "message": "User successfully created",
                })
        }
        catch(err: any){
            res.status(500).json({
                    "statusCode": 500,
                    "message" : `Server Error ${err.message}`,
                })
        }
    }

    static async loginUser(req: Request, res: Response): Promise<void> {
        try {
            // checking fields are filled in
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                        errors: errors.array()
                    })
                return;
            }

            // Getting data from the request body
            const { userEmail, userPassword } = req.body;

            // Getting user by email
            const candidate: RowDataPacket[] = await UsersModel.getUserByEmail(userEmail);

            // checking for user existence
            if (candidate.length === 0){
                res.status(401).json({"message": "Incorrect email or password"})
                return;
            }
            if(!await bcrypt.compare(userPassword, candidate[0].user_password)){
                res.status(401).json({ "message": "Incorrect email or password"});
                return;
            }

            const user: RowDataPacket = candidate[0];
            console.log(user.id);
            // return a JWT token and refresh JWT token
            const accessToken: string = jwt.sign(
                {userName: user.user_name, user_id: user.id},
                process.env.ACCESS_TOKEN_SECRET!,
                {expiresIn: "60s"}
            )
            const refreshToken: string = jwt.sign(
                {userName: user.user_name, user_id: user.id},
                process.env.REFRESH_TOKEN_SECRET!,
                {expiresIn: "7d"}
            )

            console.log('saving jwt')
            // saving in cookies JWT refresh
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            console.log('jwt saved in cookies')

            await TokenModel.updateRefreshToken(refreshToken, user.id);
            res.status(200).json({
                accessToken,
                message: `Authorization successful\n Welcome ${user.user_name}`,
            })
            return;
        }
        catch(err:any){
            res
                .status(500)
                .json({
                    "statusCode": 500,
                    "message" : `Server Error ${err.message}`,
                })
            return;
        }
    }

    static async getAllUsers(req: Request, res: Response): Promise<void> {
        const users: RowDataPacket[] = await UsersModel.getAllUsersModel()
        res.json(users)
    }
}
