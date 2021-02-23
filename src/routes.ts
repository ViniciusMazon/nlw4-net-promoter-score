import { Router } from 'express';
import { UserController } from './app/controllers/UserController';

const routes = Router();

const userController = new UserController();

//Public routes
routes.post('/users', userController.create);

export default routes;
