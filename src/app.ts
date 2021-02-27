import cors from 'cors';
import 'dotenv/config';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import createConnection from './database';
import { AppError } from './errors/AppError';
import routes from './routes';

createConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: 'Error',
      message: `Internal server error ${err.message}`,
    });
  }
);

export default app;
