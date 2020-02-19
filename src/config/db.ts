import { ConnectionOptions } from 'mongoose';
console.log(process.env.NODE_ENV);
const {
    MONGO_USERNAME = 'admin',
    MONGO_PASSWORD = 'secret',
    MONGO_HOST = 'localhost',
    MONGO_PORT = (process.env.NODE_ENV as any) ===
    ('testing' as string)
        ? 27017
        : 27018,
    MONGO_DATABASE = 'auth'
} = process.env;

export const MONGO_URI = `mongodb://${MONGO_USERNAME}:${encodeURIComponent(
    MONGO_PASSWORD
)}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;

export const MONGO_OPTIONS: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
