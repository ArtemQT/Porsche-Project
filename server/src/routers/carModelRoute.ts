import express, {Router} from 'express';
import { CarModelsController } from '../controllers/CarModelsController'

export const carModelsRouter: Router = express.Router();

carModelsRouter.get('/911', CarModelsController.get911CarModels);