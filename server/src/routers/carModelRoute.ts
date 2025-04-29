import express, {Router} from 'express';
import { CarModelsController } from '../controllers/CarModelsController'

export const carModelsRouter: Router = express.Router();

carModelsRouter.get('/911', CarModelsController.getCarModels);
carModelsRouter.get('/718', CarModelsController.getCarModels);
