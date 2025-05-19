import express, {Router} from 'express';
import { CarModelsController } from '../controllers/carModelsController'

export const carModelsRouter: Router = express.Router();

carModelsRouter.get('/911', CarModelsController.getCarModels);
carModelsRouter.get('/718', CarModelsController.getCarModels);
carModelsRouter.get('/allModels', CarModelsController.getAllModels);

