import 'dotenv/config';
import 'reflect-metadata';
import './database';
import app from './app';

app.listen(process.env.PORT || 3333, () =>
  console.log('⚡ Server is running...')
);
