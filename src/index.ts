import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import morgan from 'morgan';

import RegisterRoutes from './routes/register';
import LoginRoutes from './routes/login';
import VeritifyRoute from './routes/vertify';
import ForgotRoute from './routes/forgot';

import bodyParser from 'body-parser';
import { APP_PORT, REDIS_OPTIONS } from './config/index';

import { createApp } from './app';
import { NotFound, errorHandler } from './middleware';
import './database';

const RedisStore = connectRedis(session);
const client = new Redis(REDIS_OPTIONS);

const store = new RedisStore({ client });
const app = createApp(store);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use('/', RegisterRoutes);
app.use('/', LoginRoutes);
app.use('/', VeritifyRoute);
app.use('/', ForgotRoute);

//Middlewares
app.use(NotFound);
app.use(errorHandler);

export const server = app.listen(APP_PORT);
export default app;
