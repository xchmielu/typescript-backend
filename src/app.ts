import session, { Store } from 'express-session';
import express, { Application } from 'express';
import { SESSION_OPTIONS } from './config/index';

export const createApp = (store: Store): Application => {
    const app = express();

    app.use(session({ ...SESSION_OPTIONS, store }));

    return app;
};
