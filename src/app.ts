import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'reflect-metadata';
import createConnection from './database';
import routes from './routes';

createConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

export default app;
