import express, {Router} from 'express';
import { usersBasketController } from '../controllers/usersBasketController';

export const usersBasketRouter: Router = express.Router();

usersBasketRouter.post('/addConfig' ,usersBasketController.addConfig);

usersBasketRouter.get('/getUserConfig', usersBasketController.getUserConfig);

usersBasketRouter.delete('/deleteUserConfig', usersBasketController.deleteConfig);