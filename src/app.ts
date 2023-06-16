import express, { Application, json } from 'express';
import 'express-async-errors';
import 'dotenv/config';
import middlewares from './middlewares';
import { usersRouter } from './routes';

const app: Application = express();
app.use(json());

app.use('/users', usersRouter);
app.use(middlewares.handleErrors);
export default app;
