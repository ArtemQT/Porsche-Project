import express, {Router} from 'express';
import { TokenController } from "../controllers/tokenController"

export const refreshTokenRouter: Router = express.Router();

refreshTokenRouter.get('/', TokenController.handleRefreshToken)